package com.backend.tms.repository;

import com.backend.tms.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;


@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    Set<Schedule> findByTrainerEmail(String email);
}
