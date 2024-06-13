package com.backend.tms.response;

import com.backend.tms.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyyMMdd hh:mm:ss")
	private LocalDateTime timeStamp;
	private String message;
	private User user;
    private String jwtToken;
	public AuthResponse(String message, User user, String jwtToken) {
		this();
		this.message = message;
		this.user = user;
		this.jwtToken = jwtToken;
	}
	public AuthResponse(){
		timeStamp = LocalDateTime.now();
	}
}
