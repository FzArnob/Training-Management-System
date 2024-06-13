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
@Table(name = Course.TABLE_NAME)
public class Course {
    public static final String TABLE_NAME= "COURSE";

	@Id
    private String courseCode;
    private String name;
    private String description;
    private String status;
}
