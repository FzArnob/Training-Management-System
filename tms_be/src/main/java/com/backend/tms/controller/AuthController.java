package com.backend.tms.controller;

import com.backend.tms.request.AuthRequest;
import com.backend.tms.model.User;
import com.backend.tms.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@CrossOrigin
public class AuthController {

	@Autowired
    AuthService authService;

    @PostMapping({"/api/auth/login"})
    public ResponseEntity<?> loginAccount(@Valid @RequestBody AuthRequest authRequest)  throws UsernameNotFoundException, BadCredentialsException, DisabledException {
        return new ResponseEntity<>(authService.createJwtToken(authRequest), HttpStatus.OK);
    }
    @PostMapping({"/api/auth/register"})
    public ResponseEntity<?> createAccount(@Valid @RequestBody User user) throws Exception {
        return new ResponseEntity<>(authService.createNewUser(user), HttpStatus.OK);
    }
    @PostMapping({"/api/upload"})
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile multipartFile) throws Exception {
        return new ResponseEntity<>("Works", HttpStatus.OK);
    }
    @GetMapping({"/api/auth/auto-login"})
    public ResponseEntity<?> autoLoginAccount(@RequestHeader(name="Authorization") String token) throws Exception {
        return new ResponseEntity<>(authService.getUserDetails(token), HttpStatus.OK);
    }
}
