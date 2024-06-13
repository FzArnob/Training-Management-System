package com.backend.tms.functional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@FunctionalInterface
public interface ErrorResponseBuilder {
    public ResponseEntity<Object> buildError(Exception exception, HttpStatus status);
}
