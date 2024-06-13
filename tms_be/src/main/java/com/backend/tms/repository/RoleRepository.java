package com.backend.tms.repository;

import com.backend.tms.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository extends JpaRepository<Role, String> {
    Role getRoleByRoleName(String roleName);
}
