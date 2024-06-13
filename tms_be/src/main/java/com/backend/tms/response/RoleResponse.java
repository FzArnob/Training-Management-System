package com.backend.tms.response;

import com.backend.tms.model.Role;
import com.backend.tms.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class RoleResponse {
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyyMMdd hh:mm:ss")
	private LocalDateTime timeStamp;
	private String message;
	private String email;
	private Role role;
	public RoleResponse(String message, String email, Role role) {
		this();
		this.message = message;
		this.email = email;
		this.role = role;
	}
	public RoleResponse(){
		timeStamp = LocalDateTime.now();
	}
}
