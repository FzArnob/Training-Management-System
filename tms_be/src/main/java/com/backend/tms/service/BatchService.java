package com.backend.tms.service;

import com.backend.tms.functional.UserData;
import com.backend.tms.model.Batch;
import com.backend.tms.model.Course;
import com.backend.tms.model.Schedule;
import com.backend.tms.model.User;
import com.backend.tms.repository.*;
import com.backend.tms.response.*;
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
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class BatchService {
    @Autowired
    RoleRepository roleRepo;
    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private BatchRepository batchRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;
    private final UserData userData = (email) -> {
        Optional<User> user = userRepository.findById(email);
        if(user.isPresent()) return user.get();
        return null;
    };

    public BatchesResponse getBatchData(String token) throws Exception {
        User currentUser = userData.get(jwtUtil.getUserNameFromToken(token.substring(7)));
        Set<SimpleGrantedAuthority> currentUserRole = AuthService.getAuthority(currentUser);
        //using Lambda Expression with Stream
        boolean isAdmin = currentUserRole.stream().anyMatch(role -> (role.getAuthority().equals("ROLE_ADMIN")));
        boolean isTrainer = currentUserRole.stream().anyMatch(role -> (role.getAuthority().equals("ROLE_TRAINER")));
        boolean isTrainee = currentUserRole.stream().anyMatch(role -> (role.getAuthority().equals("ROLE_TRAINEE")));
        List<Batch> batches= batchRepository.findAll();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String currentDate = LocalDate.now().format(formatter);
        List<Batch> previous = batches.stream().filter(batch -> LocalDate.parse(currentDate, formatter).isAfter(LocalDate.parse(batch.getEndDate(), formatter))).collect(Collectors.toList());
        List<Batch> running = batches.stream().filter(batch -> !LocalDate.parse(batch.getStartDate(), formatter).isAfter(LocalDate.parse(currentDate, formatter)) && !LocalDate.parse(currentDate, formatter).isAfter(LocalDate.parse(batch.getEndDate(), formatter))).collect(Collectors.toList());
        List<Batch> upcoming = batches.stream().filter(batch -> LocalDate.parse(currentDate, formatter).isBefore(LocalDate.parse(batch.getStartDate(), formatter))).collect(Collectors.toList());
        if(isAdmin || isTrainer) {
            return new BatchesResponse("Courses collected", previous, running, upcoming);
        } else if(isTrainee){
            List<Batch> traineeBatch = running.stream().filter(batch -> batch.getTrainees().stream().anyMatch(email -> email.equals(currentUser.getEmail()))).collect(Collectors.toList());
            return new BatchesResponse("Courses collected", new ArrayList<>(), traineeBatch, new ArrayList<>());
        }
        return new BatchesResponse("Courses collected", new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
    }

    public BatchResponse saveBatchData(Batch batch)  throws Exception {
        Optional<Batch> courseDB = batchRepository.findById(batch.getBatchCode());
        if(courseDB.isPresent()) throw new Exception("Batch already exist: " + batch.getBatchCode());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        if(LocalDate.parse(batch.getStartDate(), formatter).isAfter(LocalDate.parse(batch.getEndDate(), formatter))) throw new Exception("Start date can never be greater than End date");
        batchRepository.save(batch);
        return new BatchResponse("Batch added.", batch);
    }
    public BatchResponse getBatch(String token, String batchCode) throws Exception {
        Optional<Batch> batchDB = batchRepository.findById(batchCode);
        if(batchDB.isEmpty()) throw new Exception("Batch not found: " + batchCode);
        User currentUser = userData.get(jwtUtil.getUserNameFromToken(token.substring(7)));
        Set<SimpleGrantedAuthority> currentUserRole = AuthService.getAuthority(currentUser);
        //using Lambda Expression with Stream
        boolean isAdmin = currentUserRole.stream().anyMatch(role -> (role.getAuthority().equals("ROLE_ADMIN")));
        boolean isTrainer = currentUserRole.stream().anyMatch(role -> (role.getAuthority().equals("ROLE_TRAINER")));
        boolean isTrainee = currentUserRole.stream().anyMatch(role -> (role.getAuthority().equals("ROLE_TRAINEE")));
        if(isTrainer || isAdmin) {
            return new BatchResponse("Batch data collected.", batchDB.get());
        } else if (isTrainee) {
            if(batchDB.get().getTrainees().stream().anyMatch(email -> email.equals(currentUser.getEmail()))){
                return new BatchResponse("Batch data collected.", batchDB.get());
            } else {
                throw new Exception("You do not have the permission: " + batchCode);
            }
        } else {
            throw new Exception("You do not have the permission: " + batchCode);
        }
    }
    public BatchResponse updateBatchData(Batch batch)  throws Exception {
        Optional<Batch> batchDB = batchRepository.findById(batch.getBatchCode());
        if(batchDB.isEmpty()) throw new Exception("Batch not found: " + batch.getBatchCode());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        if(LocalDate.parse(batch.getStartDate(), formatter).isAfter(LocalDate.parse(batch.getEndDate(), formatter))) throw new Exception("Start date can never be greater than End date");
        batchRepository.save(batch);
        return new BatchResponse("Batch updated.", batch);
    }
    public boolean scheduleOverlapChecker(Set<Schedule> schedules, Schedule schedule, String errMsg) throws Exception {
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        if(schedules.stream()
                 .anyMatch(s -> !LocalTime.parse(s.getScheduleEndTime(), timeFormatter)
                                .isBefore(LocalTime.parse(schedule.getScheduleStartTime())) ||
                                !LocalTime.parse(s.getScheduleStartTime(), timeFormatter)
                                .isBefore(LocalTime.parse(schedule.getScheduleEndTime())))) {
            // time clash
            if(schedules.stream()
                    .anyMatch(s -> !LocalDate.parse(s.getEndDate(), dateFormatter)
                            .isBefore(LocalDate.parse(schedule.getStartDate())) ||
                            !LocalDate.parse(s.getStartDate(), dateFormatter)
                                    .isBefore(LocalDate.parse(schedule.getEndDate())))) {
                //date clash
                throw new Exception(errMsg);
            } else return true;
        } else return true;
    }
    public BatchResponse addTraineeToBatch(String email, String batchCode)  throws Exception {
        Optional<Batch> batchDB = batchRepository.findById(batchCode);
        User user = userData.get(email);
        if(batchDB.isEmpty()) throw new Exception("Batch not found: " + batchCode);
        if(batchDB.get().getTrainees().contains(email)) throw new Exception("Trainee already added to " + batchCode);
        if(user == null) throw new UsernameNotFoundException("User not found: " + email);
        if(!user.getRole().stream().anyMatch(role -> role.getRoleName().equals("TRAINEE"))) throw new Exception("User does have Trainee role: " + email);
        Set<String> trainees = batchDB.get().getTrainees();
        trainees.add(email);
        batchDB.get().setTrainees(trainees);
        batchRepository.save(batchDB.get());
        return new BatchResponse("Trainee added", batchDB.get());
    }
    public BatchResponse addScheduleToBatch(Schedule schedule)  throws Exception {
        Optional<Batch> batchDB = batchRepository.findById(schedule.getBatchCode());
        Optional<Course> courseDB = courseRepository.findById(schedule.getCourseCode());
        User user = userData.get(schedule.getTrainerEmail());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        if(LocalDate.parse(schedule.getStartDate(), formatter).isAfter(LocalDate.parse(schedule.getEndDate(), formatter))) throw new Exception("Start date can never be greater than End date");
        if(batchDB.isEmpty()) throw new Exception("Batch not found: " + schedule.getBatchCode());
        if(courseDB.isEmpty()) throw new Exception("Course not found: " + schedule.getCourseCode());
        if(user == null) throw new UsernameNotFoundException("Trainer not found: " + schedule.getTrainerEmail());
        if(!user.getRole().stream().anyMatch(role -> role.getRoleName().equals("TRAINER"))) throw new Exception("User does have Trainer role: " + schedule.getTrainerEmail());
        Set<Schedule> schedules = batchDB.get().getSchedules();
        Set<Schedule> trainerSchedules = scheduleRepository.findByTrainerEmail(schedule.getTrainerEmail());
        scheduleOverlapChecker(schedules, schedule, "Schedule time conflict with existing one");
        scheduleOverlapChecker(trainerSchedules, schedule, "Schedule time conflict with Trainer's schedule");
        schedules.add(schedule);
        batchDB.get().setSchedules(schedules);
        batchRepository.save(batchDB.get());
        return new BatchResponse("Schedule added to "+ batchDB.get().getName(), batchDB.get());
    }
    public BatchResponse removeTraineeFromBatch(String email, String batchCode)  throws Exception {
        Optional<Batch> batchDB = batchRepository.findById(batchCode);
        User user = userData.get(email);
        if(batchDB.isEmpty()) throw new Exception("Batch not found: " + batchCode);
        if(!batchDB.get().getTrainees().contains(email)) throw new Exception("Trainee does not exist in " + batchCode);
        if(user == null) throw new UsernameNotFoundException("User not found: " + email);
        Set<String> trainees = batchDB.get().getTrainees();
        trainees.remove(email);
        batchDB.get().setTrainees(trainees);
        batchRepository.save(batchDB.get());
        return new BatchResponse("Trainee removed from ", batchDB.get());
    }
    public BatchResponse removeScheduleFromBatch(Long scheduleId)  throws Exception {
        Optional<Schedule> schedule = scheduleRepository.findById(scheduleId);
        if(schedule.isEmpty()) throw new Exception("Schedule not found");
        Optional<Batch> batchDB = batchRepository.findById(schedule.get().getBatchCode());
        if(batchDB.isEmpty()) throw new Exception("Batch not found: " + schedule.get().getBatchCode());
        Set<Schedule> schedules = batchDB.get().getSchedules().stream().filter(s -> !s.getScheduleId().equals(scheduleId)).collect(Collectors.toSet());
        batchDB.get().setSchedules(schedules);
        batchRepository.save(batchDB.get());
        scheduleRepository.deleteById(scheduleId);
        return new BatchResponse("Schedule removed from ", batchDB.get());
    }
}
