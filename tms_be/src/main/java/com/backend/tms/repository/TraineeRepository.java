package com.backend.tms.repository;

import com.backend.tms.model.Trainee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TraineeRepository extends JpaRepository<Trainee, String> {

}
