package com.backend.tms.service;

import com.backend.tms.exception.UserAlreadyExistException;
import com.backend.tms.functional.UserData;
import com.backend.tms.model.ApplicationStatus;
import com.backend.tms.model.Trainee;
import com.backend.tms.model.User;
import com.backend.tms.repository.ApplicationStatusRepository;
import com.backend.tms.repository.RoleRepository;
import com.backend.tms.repository.TraineeRepository;
import com.backend.tms.repository.UserRepository;
import com.backend.tms.response.StatusResponse;
import com.backend.tms.response.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TraineeService {

    @Autowired
    RoleRepository roleRepo;
    @Autowired
    ApplicationStatusRepository statusRepo;

	@Autowired
	private UserRepository userRepository;
    @Autowired
    private TraineeRepository traineeRepository;

    //using Lambda Expression using Functional Interface
    private final UserData userData = (email) -> {
        Optional<User> user = userRepository.findById(email);
        if(user.isPresent()) return user.get();
        return null;
    };
    public UserResponse createTraineeApplication(User user) throws UserAlreadyExistException {
        ApplicationStatus status = statusRepo.getApplicationStatusByStatusName("APPLIED");
        Trainee trainee = user.getTrainee();
        trainee.setTraineeEmail(user.getEmail());
        trainee.setApplicationStatus(status);
        if(userData.get(user.getEmail()) != null) throw new UserAlreadyExistException("User already exist: " + user.getEmail());
        traineeRepository.save(trainee);
        user.setTrainee(trainee);
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        userRepository.save(user);
        user.setPassword(null);

        return new UserResponse("Application submitted successfully: "+ user.getEmail(), user);
    }
    public StatusResponse setApplicationStatus(String email, String statusName) throws UsernameNotFoundException {
        User user = userData.get(email);
        if(user == null) throw new UsernameNotFoundException("User not found: " + user.getEmail());
        ApplicationStatus status = statusRepo.getApplicationStatusByStatusName(statusName);
        Trainee trainee = user.getTrainee();
        trainee.setApplicationStatus(status);
        traineeRepository.save(trainee);
        return new StatusResponse("Application status updated successfully.", email, status);
    }
}
