package com.backend.tms.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = Schedule.TABLE_NAME)
public class Schedule {
    public static final String TABLE_NAME= "COURSE_SCHEDULE";

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduleId;
    private String startDate;
    private String endDate;
    private String scheduleStartTime;
    private String scheduleEndTime;
    private String courseCode;
    private String trainerEmail;
    private String batchCode;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "COURSE_SCHEDULE_ASSIGNMENT",
            joinColumns = {
                    @JoinColumn(name = "scheduleId")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "assignmentId")
            }
    )
    private Set<Assignment> assignments;


}
