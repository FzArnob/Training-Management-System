package com.backend.tms.exception;

import com.backend.tms.functional.ErrorResponseBuilder;
import com.backend.tms.response.ErrorResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.FileNotFoundException;
import java.io.IOException;

@Order(Ordered.HIGHEST_PRECEDENCE)
// using Aspect Oriented Programming (AOP)
@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
    //using Lambda Expression using Functional Interface
    private final ErrorResponseBuilder errorResponseBuilder = (ex, status) -> {
        String error = ex.getMessage();
        logger.warn(error);
        return new ResponseEntity<>(new ErrorResponse(error), status);
    };
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> Exception(Exception ex){
        return errorResponseBuilder.buildError(ex, HttpStatus.SEE_OTHER);
    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Object> handleBadCredentialsException(BadCredentialsException ex){
        return errorResponseBuilder.buildError(ex, HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(UserAlreadyExistException.class)
    public ResponseEntity<Object> handleUserAlreadyExistException(UserAlreadyExistException ex){
        return errorResponseBuilder.buildError(ex, HttpStatus.CONFLICT);
    }
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException ex){
        return errorResponseBuilder.buildError(ex, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<Object> handleUsernameNotFoundException(UsernameNotFoundException ex){
        return errorResponseBuilder.buildError(ex, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<Object> handleSecurityException(SecurityException ex){
        return errorResponseBuilder.buildError(ex, HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(IOException.class)
    public ResponseEntity<Object> handleIOException(IOException ex){
        return errorResponseBuilder.buildError(ex, HttpStatus.CONFLICT);
    }
    @ExceptionHandler(FileNotFoundException.class)
    public ResponseEntity<Object> handleFileNotFoundException(FileNotFoundException ex){
        return errorResponseBuilder.buildError(ex, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Object> handleAccessDeniedException(AccessDeniedException ex){
        return errorResponseBuilder.buildError(ex, HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<Object> handleDisabledException(DisabledException ex){
        return errorResponseBuilder.buildError(ex, HttpStatus.NOT_ACCEPTABLE);
    }
}
