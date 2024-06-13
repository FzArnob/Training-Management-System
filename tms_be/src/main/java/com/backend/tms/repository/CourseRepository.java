package com.backend.tms.repository;

import com.backend.tms.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CourseRepository extends JpaRepository<Course, String> {
    List<Course> findByStatus(String status);
}
