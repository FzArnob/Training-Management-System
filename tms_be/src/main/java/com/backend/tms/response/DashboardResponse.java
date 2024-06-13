package com.backend.tms.response;

import com.backend.tms.model.Batch;
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
public class DashboardResponse {
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyyMMdd hh:mm:ss")
	private LocalDateTime timeStamp;
	private String message;
	private List<User> users;
	private int previousBatches;
	private int runningBatches;
	private int upcomingBatches;
	private int previousCourses;
	private int runningCourses;
	private int upcomingCourses;
	public DashboardResponse(String message, List<User> users, int previousBatches, int runningBatches, int upcomingBatches, int previousCourses, int runningCourses, int upcomingCourses) {
		this();
		this.message = message;
		this.users = users;
		this.previousBatches = previousBatches;
		this.runningBatches = runningBatches;
		this.upcomingBatches = upcomingBatches;
		this.previousCourses = previousCourses;
		this.runningCourses = runningCourses;
		this.upcomingCourses = upcomingCourses;

	}
	public DashboardResponse(){
		timeStamp = LocalDateTime.now();
	}
}
