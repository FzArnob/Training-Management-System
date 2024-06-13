package com.backend.tms.repository;

import com.backend.tms.model.Batch;
import com.backend.tms.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BatchRepository extends JpaRepository<Batch, String> {
//    List<Batch> findByStatus(String status);
}
