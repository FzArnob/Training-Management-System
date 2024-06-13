package com.backend.tms.response;

import com.backend.tms.model.ApplicationStatus;
import com.backend.tms.model.Role;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class StatusResponse {
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyyMMdd hh:mm:ss")
	private LocalDateTime timeStamp;
	private String message;
	private String email;
	private ApplicationStatus status;
	public StatusResponse(String message, String email, ApplicationStatus status) {
		this();
		this.message = message;
		this.email = email;
		this.status = status;
	}
	public StatusResponse(){
		timeStamp = LocalDateTime.now();
	}
}
