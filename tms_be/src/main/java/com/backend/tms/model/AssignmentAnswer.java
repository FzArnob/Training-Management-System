package com.backend.tms.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = AssignmentAnswer.TABLE_NAME)
public class AssignmentAnswer {
    public static final String TABLE_NAME= "ASSIGNMENT_ANSWER";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;
    private String answer;
    private String answerFile;
    private String evaluation;
    private String traineeEmail;
}
