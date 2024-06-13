package com.backend.tms.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = Assignment.TABLE_NAME)
public class Assignment {
    public static final String TABLE_NAME= "ASSIGNMENT";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assignmentId;
    private String question;
    private String assignmentFile;
    private String time;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "ASSIGNMENT_ANSWER_MAP",
            joinColumns = {
                    @JoinColumn(name = "assignmentId")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "answerId")
            }
    )
    private Set<AssignmentAnswer> answers;
}
