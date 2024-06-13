package com.backend.tms.response;

import com.backend.tms.model.Batch;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class BatchResponse {
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyyMMdd hh:mm:ss")
	private LocalDateTime timeStamp;
	private String message;
	private Batch batch;
	public BatchResponse(String message, Batch batch) {
		this();
		this.message = message;
		this.batch = batch;
	}
	public BatchResponse(){
		timeStamp = LocalDateTime.now();
	}
}
