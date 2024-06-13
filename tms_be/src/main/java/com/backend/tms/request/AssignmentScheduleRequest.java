package com.backend.tms.request;

import com.backend.tms.model.Assignment;
import com.backend.tms.model.Schedule;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentScheduleRequest {
	
	private Assignment assignment;
    private Long schedule;
}
