package com.backend.tms.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = Trainer.TABLE_NAME)
public class Trainer {
    public static final String TABLE_NAME= "TRAINER";
    public Trainer(String email){
        super();
        this.trainerEmail = email;
    }
    @Id
    private String trainerEmail;
    private String nidNo;
    private String experience;
    private String bloodGroup;
    private String expertise;
}
