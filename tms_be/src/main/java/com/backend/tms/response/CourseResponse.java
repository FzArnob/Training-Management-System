package com.backend.tms.response;

import com.backend.tms.model.Course;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class CourseResponse {
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyyMMdd hh:mm:ss")
	private LocalDateTime timeStamp;
	private String message;
	private Course course;
	public CourseResponse(String message, Course course) {
		this();
		this.message = message;
		this.course = course;
	}
	public CourseResponse(){
		timeStamp = LocalDateTime.now();
	}
}
