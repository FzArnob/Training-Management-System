package com.backend.tms.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = ApplicationStatus.TABLE_NAME)
public class ApplicationStatus {
    public static final String TABLE_NAME= "APPLICATION_STATUS";

    @Id
    private String statusName;
    private String statusDescription;


}
