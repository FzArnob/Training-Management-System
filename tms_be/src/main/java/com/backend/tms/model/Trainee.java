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
@Table(name = Trainee.TABLE_NAME)
public class Trainee {
    public static final String TABLE_NAME= "TRAINEE";

    @Id
    private String traineeEmail;
    private String nidNo;
    private String experience;
    private String bloodGroup;
    private String resume;
    private String institute;
    private String cgpa;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinTable(name = "TRAINEE_APPLICATION_STATUS",
            joinColumns = {
                    @JoinColumn(name = "traineeEmail")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "status_name")
            }
    )
    private ApplicationStatus applicationStatus;

    public Trainee(String traineeEmail) {
        this.traineeEmail = traineeEmail;
    }
}
