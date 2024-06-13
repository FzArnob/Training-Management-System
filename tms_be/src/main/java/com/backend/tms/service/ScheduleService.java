package com.backend.tms.service;

import com.backend.tms.functional.UserData;
import com.backend.tms.model.*;
import com.backend.tms.repository.*;
import com.backend.tms.response.BatchResponse;
import com.backend.tms.response.BatchesResponse;
import com.backend.tms.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ScheduleService {
    @Autowired
    RoleRepository roleRepo;
    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private AssignmentRepository assignmentRepository;
    @Autowired
    private BatchRepository batchRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AssignmentAnswerRepository assignmentAnswerRepository;
    @Autowired
    private JwtUtil jwtUtil;
    private final UserData userData = (email) -> {
        Optional<User> user = userRepository.findById(email);
        if(user.isPresent()) return user.get();
        return null;
    };
    public BatchResponse addAssignment(String token, Assignment assignment, Long scheduleId)  throws Exception {
        Optional<Schedule> schedule = scheduleRepository.findById(scheduleId);
        if(schedule.isEmpty()) throw new Exception("Schedule not found");
        Optional<Batch> batchDB = batchRepository.findById(schedule.get().getBatchCode());
        if(batchDB.isEmpty()) throw new Exception("Batch not found: " + schedule.get().getBatchCode());
        User currentUser = userData.get(jwtUtil.getUserNameFromToken(token.substring(7)));
        if(!currentUser.getEmail().equals(schedule.get().getTrainerEmail())) throw new Exception("User is not assigned as a Trainer for this course schedule: " + schedule.get().getCourseCode());
        Set<Assignment> assignments = schedule.get().getAssignments();
        assignments.add(assignment);
        schedule.get().setAssignments(assignments);
        scheduleRepository.save(schedule.get());
        batchDB = batchRepository.findById(schedule.get().getBatchCode());
        return new BatchResponse("Assignment added", batchDB.get());
    }
    public BatchResponse addAnswer(String token, AssignmentAnswer answer, Long assignmentId, String batchCode)  throws Exception {
        Optional<Assignment> assignment = assignmentRepository.findById(assignmentId);
        if(assignment.isEmpty()) throw new Exception("Assignment not found");
        Set<AssignmentAnswer> assignmentAnswers = assignment.get().getAnswers();
        assignmentAnswers.add(answer);
        assignment.get().setAnswers(assignmentAnswers);
        assignmentRepository.save(assignment.get());
        Optional<Batch> batchDB = batchRepository.findById(batchCode);
        return new BatchResponse("Assignment added", batchDB.get());
    }
    public BatchResponse answerEvaluate(String token, Long answerId, String evaluation, String batchCode)  throws Exception {
        Optional<AssignmentAnswer> assignmentAnswer = assignmentAnswerRepository.findById(answerId);
        if(assignmentAnswer.isEmpty()) throw new Exception("Answer not found");
        assignmentAnswer.get().setEvaluation(evaluation);
        assignmentAnswerRepository.save(assignmentAnswer.get());
        Optional<Batch> batchDB = batchRepository.findById(batchCode);
        return new BatchResponse("Evaluation successful", batchDB.get());
    }
    public BatchResponse removeAssignment(String token, Long scheduleId, Long assignmentId)  throws Exception {
        Optional<Schedule> schedule = scheduleRepository.findById(scheduleId);
        if(schedule.isEmpty()) throw new Exception("Schedule not found");
        Optional<Batch> batchDB = batchRepository.findById(schedule.get().getBatchCode());
        if(batchDB.isEmpty()) throw new Exception("Batch not found: " + schedule.get().getBatchCode());
        User currentUser = userData.get(jwtUtil.getUserNameFromToken(token.substring(7)));
        if(!currentUser.getEmail().equals(schedule.get().getTrainerEmail())) throw new Exception("User is not assigned as a Trainer for this course schedule: " + schedule.get().getCourseCode());
        Set<Assignment> assignments = schedule.get().getAssignments();
        schedule.get().setAssignments(assignments.stream().filter(assignment -> !assignment.getAssignmentId().equals(assignmentId)).collect(Collectors.toSet()));
        scheduleRepository.save(schedule.get());
        batchDB = batchRepository.findById(schedule.get().getBatchCode());
        assignmentRepository.deleteById(assignmentId);
        return new BatchResponse("Assignment deleted", batchDB.get());
    }
}
