package com.backend.tms.exception;

public class UserAlreadyExistException extends Exception{
    public UserAlreadyExistException(String msg){
        super(msg);
    }
    public UserAlreadyExistException(String msg, UserAlreadyExistException ex){
        super(msg, ex);
    }
}
