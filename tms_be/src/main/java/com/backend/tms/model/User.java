package com.backend.tms.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = User.TABLE_NAME)
public class User {
    public static final String TABLE_NAME= "USER";

	@Id
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String address;
    private String dateOfBirth;
    private String gender;
    private String profilePicture;
    private String phone;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinTable(name = "USER_ROLE",
            joinColumns = {
                    @JoinColumn(name = "email")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "role_name")
            }
    )
    private Set<Role> role;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "USER_TRAINEE",
            joinColumns = {
                    @JoinColumn(name = "email")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "trainee_email")
            }
    )
    private Trainee trainee;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "USER_TRAINER",
            joinColumns = {
                    @JoinColumn(name = "email")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "trainer_email")
            }
    )
    private Trainer trainer;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "USER_ADMIN",
            joinColumns = {
                    @JoinColumn(name = "email")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "admin_email")
            }
    )
    private Admin admin;

}
