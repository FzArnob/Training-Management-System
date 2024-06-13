package com.backend.tms.request;

import com.backend.tms.model.AssignmentAnswer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EvaluateAnswerRequest {
	
	private Long answerId;
    private String evaluation;
    private String batchCode;
}
