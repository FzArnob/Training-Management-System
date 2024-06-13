package com.backend.tms.response;

import com.backend.tms.model.Batch;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class BatchesResponse {
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyyMMdd hh:mm:ss")
	private LocalDateTime timeStamp;
	private String message;
	private List<Batch> previousBatches;
	private List<Batch> runningBatches;
	private List<Batch> upcomingBatches;
	public BatchesResponse(String message, List<Batch> previousBatches, List<Batch> runningBatches, List<Batch> upcomingBatches){
		super();
		this.timeStamp = LocalDateTime.now();
		this.message = message;
		this.previousBatches = previousBatches;
		this.runningBatches = runningBatches;
		this.upcomingBatches = upcomingBatches;
	}
}
