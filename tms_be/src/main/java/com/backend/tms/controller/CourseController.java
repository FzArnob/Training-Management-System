package com.backend.tms.controller;

import com.backend.tms.model.Course;
import com.backend.tms.model.User;
import com.backend.tms.request.RoleRequest;
import com.backend.tms.service.CourseService;
import com.backend.tms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class CourseController {

    @Autowired
    CourseService courseService;

    @GetMapping ("/api/course/get/all")
    public ResponseEntity<?> getCourse(@RequestHeader (name="Authorization") String token) throws Exception {
        return new ResponseEntity<>(courseService.getCourseData(token), HttpStatus.OK);
    }
    @PostMapping ("/api/course/save")
        @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveCourse(@RequestHeader (name="Authorization") String token, @RequestBody Course course) throws Exception {
        return new ResponseEntity<>(courseService.saveCourseData(token, course), HttpStatus.OK);
    }
    @PostMapping ("/api/course/update")
    //    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateCourse(@RequestHeader (name="Authorization") String token, @RequestBody Course course) throws Exception {
        return new ResponseEntity<>(courseService.updateCourseData(token, course), HttpStatus.OK);
    }
}
