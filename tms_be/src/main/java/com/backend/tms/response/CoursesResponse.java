package com.backend.tms.response;

import com.backend.tms.model.Course;
import com.backend.tms.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class CoursesResponse {
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyyMMdd hh:mm:ss")
	private LocalDateTime timeStamp;
	private String message;
	private List<Course> previousCourses;
	private List<Course> runningCourses;
	private List<Course> upcomingCourses;
	public CoursesResponse(String message, List<Course> previousCourses, List<Course> runningCourses, List<Course> upcomingCourses){
		super();
		this.timeStamp = LocalDateTime.now();
		this.message = message;
		this.previousCourses = previousCourses;
		this.runningCourses = runningCourses;
		this.upcomingCourses = upcomingCourses;
	}
}
