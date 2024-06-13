package com.backend.tms.controller;

import com.backend.tms.model.User;
import com.backend.tms.request.StatusRequest;
import com.backend.tms.service.TraineeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
@RestController
@CrossOrigin
public class TraineeController {

	@Autowired
    TraineeService traineeService;

    @PostMapping({"/api/trainee/apply"})
    public ResponseEntity<?> createAccount(@Valid @RequestBody User user) throws Exception {
        return new ResponseEntity<>(traineeService.createTraineeApplication(user), HttpStatus.OK);
    }
    @PostMapping ("/api/trainee/application-status")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> setApplicationStatus(@RequestBody StatusRequest statusRequest) {
        return new ResponseEntity<>(traineeService.setApplicationStatus(statusRequest.getEmail(), statusRequest.getStatusName()), HttpStatus.OK);
    }
}
