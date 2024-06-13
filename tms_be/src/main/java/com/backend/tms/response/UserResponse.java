package com.backend.tms.response;

import com.backend.tms.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class UserResponse {
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyyMMdd hh:mm:ss")
	private LocalDateTime timeStamp;
	private String message;
	private User user;
	public UserResponse(String message, User user) {
		this();
		this.message = message;
		this.user = user;
	}
	public UserResponse(){
		timeStamp = LocalDateTime.now();
	}
}
