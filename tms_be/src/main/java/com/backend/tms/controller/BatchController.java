package com.backend.tms.controller;

import com.backend.tms.model.Batch;
import com.backend.tms.model.Schedule;
import com.backend.tms.request.BatchScheduleRequest;
import com.backend.tms.request.BatchTraineeRequest;
import com.backend.tms.service.BatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class BatchController {

    @Autowired
    BatchService batchService;

    @GetMapping ("/api/batch/get/all")
    public ResponseEntity<?> getBatch(@RequestHeader (name="Authorization") String token) throws Exception {
        return new ResponseEntity<>(batchService.getBatchData(token), HttpStatus.OK);
    }
    @PostMapping ("/api/batch/save")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveBatch(@RequestBody Batch batch) throws Exception {
        return new ResponseEntity<>(batchService.saveBatchData(batch), HttpStatus.OK);
    }
    @PostMapping ("/api/batch/update")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateBatch( @RequestBody Batch batch) throws Exception {
        return new ResponseEntity<>(batchService.updateBatchData(batch), HttpStatus.OK);
    }
    @PostMapping ("/api/batch/add-trainee")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addTraineeToBatch( @RequestBody BatchTraineeRequest req) throws Exception {
        return new ResponseEntity<>(batchService.addTraineeToBatch(req.getEmail(), req.getBatchCode()), HttpStatus.OK);
    }
    @PostMapping ("/api/batch/remove-trainee")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> removeTraineeFromBatch( @RequestBody BatchTraineeRequest req) throws Exception {
        return new ResponseEntity<>(batchService.removeTraineeFromBatch(req.getEmail(), req.getBatchCode()), HttpStatus.OK);
    }
    @PostMapping ("/api/batch/add-schedule")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addScheduleToBatch( @RequestBody Schedule schedule) throws Exception {
        return new ResponseEntity<>(batchService.addScheduleToBatch(schedule), HttpStatus.OK);
    }
    @PostMapping ("/api/batch/remove-schedule")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> removeScheduleFromBatch( @RequestBody BatchScheduleRequest schedule) throws Exception {
        return new ResponseEntity<>(batchService.removeScheduleFromBatch(schedule.getScheduleId()), HttpStatus.OK);
    }
    @GetMapping ("/api/batch/get/{batchCode}")
    public ResponseEntity<?> getUser(@RequestHeader (name="Authorization") String token, @PathVariable String batchCode) throws Exception {
        return new ResponseEntity<>(batchService.getBatch(token, batchCode), HttpStatus.OK);
    }
}
