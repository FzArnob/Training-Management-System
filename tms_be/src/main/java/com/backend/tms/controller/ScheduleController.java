package com.backend.tms.controller;

import com.backend.tms.model.Batch;
import com.backend.tms.model.Schedule;
import com.backend.tms.request.*;
import com.backend.tms.service.BatchService;
import com.backend.tms.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class ScheduleController {

    @Autowired
    ScheduleService scheduleService;

    @PostMapping ("/api/schedule/add-assignment")
    @PreAuthorize("hasRole('TRAINER')")
    public ResponseEntity<?> addAssignment(@RequestHeader (name="Authorization") String token, @RequestBody AssignmentScheduleRequest req) throws Exception {
        return new ResponseEntity<>(scheduleService.addAssignment(token, req.getAssignment(), req.getSchedule()), HttpStatus.OK);
    }
    @PostMapping ("/api/schedule/add-assignment-answer")
    @PreAuthorize("hasRole('TRAINEE')")
    public ResponseEntity<?> addAnswer(@RequestHeader (name="Authorization") String token, @RequestBody AssignmentAnswerRequest req) throws Exception {
        return new ResponseEntity<>(scheduleService.addAnswer(token, req.getAnswer(), req.getAssignmentId(), req.getBatchCode()), HttpStatus.OK);
    }
    @PostMapping ("/api/schedule/add-assignment-answer-evaluate")
    @PreAuthorize("hasRole('TRAINER')")
    public ResponseEntity<?> answerEvaluate(@RequestHeader (name="Authorization") String token, @RequestBody EvaluateAnswerRequest req) throws Exception {
        return new ResponseEntity<>(scheduleService.answerEvaluate(token, req.getAnswerId(), req.getEvaluation(), req.getBatchCode()), HttpStatus.OK);
    }
    @PostMapping ("/api/schedule/remove-assignment")
    @PreAuthorize("hasRole('TRAINER')")
    public ResponseEntity<?> removeAssignment(@RequestHeader (name="Authorization") String token, @RequestBody AssignmentScheduleRemoveRequest req) throws Exception {
        return new ResponseEntity<>(scheduleService.removeAssignment(token, req.getScheduleId(), req.getAssignmentId()), HttpStatus.OK);
    }
}
