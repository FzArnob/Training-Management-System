package com.backend.tms.controller;

import com.backend.tms.model.User;
import com.backend.tms.request.RoleRequest;
import com.backend.tms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping ("/api/user/get/{email}")
    public ResponseEntity<?> getUser(@RequestHeader (name="Authorization") String token, @PathVariable String email) {
        return new ResponseEntity<>(userService.getUserData(token, email), HttpStatus.OK);
    }
    @GetMapping ("/api/user/get/dashboard")
    public ResponseEntity<?> getDashboard(@RequestHeader (name="Authorization") String token) throws Exception {
        return new ResponseEntity<>(userService.getDashboard(token), HttpStatus.OK);
    }
    @PostMapping ("/api/user/edit")
    public ResponseEntity<?> editUser(@RequestHeader (name="Authorization") String token, @RequestBody User user) {
        return new ResponseEntity<>(userService.editUserData(token, user), HttpStatus.OK);
    }
    @DeleteMapping ("/api/user/delete/{email}")
    public ResponseEntity<?> deleteUser(@PathVariable String email) {
        return new ResponseEntity<>(userService.deleteUserData(email), HttpStatus.OK);
    }
    @PostMapping ("/api/user/assign-role")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> assignUserRole(@RequestBody RoleRequest roleRequest) throws Exception {
        return new ResponseEntity<>(userService.assignUserRole(roleRequest.getEmail(), roleRequest.getRoleName()), HttpStatus.OK);
    }
    @PostMapping ("/api/user/remove-role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> removeUserRole(@RequestBody RoleRequest roleRequest) throws Exception {
        return new ResponseEntity<>(userService.removeUserRole(roleRequest.getEmail(), roleRequest.getRoleName()), HttpStatus.OK);
    }
}
