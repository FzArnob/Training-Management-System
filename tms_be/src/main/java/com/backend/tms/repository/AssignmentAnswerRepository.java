package com.backend.tms.repository;

import com.backend.tms.model.Assignment;
import com.backend.tms.model.AssignmentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AssignmentAnswerRepository extends JpaRepository<AssignmentAnswer, Long> {
}
