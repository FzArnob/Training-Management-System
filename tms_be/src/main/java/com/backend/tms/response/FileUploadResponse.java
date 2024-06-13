package com.backend.tms.response;

import com.backend.tms.model.ApplicationStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class FileUploadResponse {
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyyMMdd hh:mm:ss")
	private LocalDateTime timeStamp;
	private String message;
	private String downloadUri;
	private String fileName;
	private Long size;
	public FileUploadResponse(String message, String downloadUri, String fileName, Long size) {
		this();
		this.message = message;
		this.downloadUri = downloadUri;
		this.fileName = fileName;
		this.size = size;
	}
	public FileUploadResponse(){
		timeStamp = LocalDateTime.now();
	}
}
