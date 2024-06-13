package com.backend.tms.repository;

import com.backend.tms.model.ApplicationStatus;
import com.backend.tms.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ApplicationStatusRepository extends JpaRepository<ApplicationStatus, String> {
    ApplicationStatus getApplicationStatusByStatusName(String statusName);
}
