package com.backend.tms.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class RefreshTokenResponse {
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyyMMdd hh:mm:ss")
	private LocalDateTime timeStamp;
	private String message;
    private String refreshToken;
	public RefreshTokenResponse(String message, String refreshToken) {
		this();
		this.message = message;
		this.refreshToken = refreshToken;
	}
	public RefreshTokenResponse(){
		timeStamp = LocalDateTime.now();
	}
}
