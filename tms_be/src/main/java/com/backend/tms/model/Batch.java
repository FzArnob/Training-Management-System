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
@Table(name = Batch.TABLE_NAME)
public class Batch {
    public static final String TABLE_NAME= "BATCH";

	@Id
    private String batchCode;
    private String name;
    private String description;
    private String startDate;
    private String endDate;
    @ElementCollection
    private Set<String> trainees;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "BATCH_SCHEDULE",
            joinColumns = {
                    @JoinColumn(name = "batch_code")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "id")
            }
    )
    private Set<Schedule> schedules;
}
