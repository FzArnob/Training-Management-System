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
@Table(name = Admin.TABLE_NAME)
public class Admin {
    public static final String TABLE_NAME= "ADMIN";
    public Admin(String email){
        super();
        this.adminEmail = email;
    }
    @Id
    private String adminEmail;
    private String designation;

}
