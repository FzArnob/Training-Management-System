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
@Table(name = Role.TABLE_NAME)
public class Role {
    public static final String TABLE_NAME= "ROLE";
	@Id
    private String roleName;
    private String roleDescription;
}
