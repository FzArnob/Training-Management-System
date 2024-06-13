package com.backend.tms.service;

import com.backend.tms.functional.UserData;
import com.backend.tms.model.*;
import com.backend.tms.repository.*;
import com.backend.tms.response.*;
import com.backend.tms.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    RoleRepository roleRepo;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private TrainerRepository trainerRepository;
    @Autowired
    private TraineeRepository traineeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private CourseService courseService;
    @Autowired
    private BatchService batchService;
    private final UserData userData = (email) -> {
        Optional<User> user = userRepository.findById(email);
        if(user.isPresent()) return user.get();
        return null;
    };

    public UserResponse getUserData(String token, String email) throws UsernameNotFoundException {
        User user = userData.get(email);
        if(user == null) throw new UsernameNotFoundException("User not found: " + email);
        user.setPassword(null);
        User currentUser = userData.get(jwtUtil.getUserNameFromToken(token.substring(7)));
        Set<SimpleGrantedAuthority> currentUserRole = AuthService.getAuthority(currentUser);
        //using Lambda Expression with Stream
        boolean isAdmin = currentUserRole.stream().anyMatch(role -> (role.getAuthority().equals("ROLE_ADMIN")));
        if(currentUser.getEmail().equals(user.getEmail()) || isAdmin) {
        }
        else {
            user.setTrainee(null);
            user.setTrainer(null);
            user.setAdmin(null);
        }
        return new UserResponse("User data collected.", user);
    }
    public RoleResponse assignUserRole(String email, String roleName)  throws Exception {
        User user = userData.get(email);
        if(user == null) throw new UsernameNotFoundException("User not found: " + email);
        if(roleName.equals("TRAINER")) {
            if(user.getRole().stream().anyMatch(role -> (role.getRoleName().equals("TRAINEE")))) throw new Exception("Please remove Trainee Role first.");
            Trainer trainer = new Trainer(user.getEmail());
            trainerRepository.save(trainer);
            user.setTrainer(trainer);
        } else if(roleName.equals("ADMIN")) {
            if(user.getRole().stream().anyMatch(role -> (role.getRoleName().equals("TRAINEE")))) throw new Exception("Please remove Trainee Role first.");
            Admin admin = new Admin(user.getEmail());
            adminRepository.save(admin);
            user.setAdmin(admin);
        } else if(roleName.equals("TRAINEE")) {
            if(user.getRole().stream().anyMatch(role -> (role.getRoleName().equals("TRAINER")))) throw new Exception("Please remove Trainer Role first.");
            if(user.getRole().stream().anyMatch(role -> (role.getRoleName().equals("ADMIN")))) throw new Exception("Please remove Admin Role first.");
            Optional<Trainee> trainee = traineeRepository.findById(user.getEmail());
            if(trainee.isEmpty()) {
                Trainee trainee1 = new Trainee(user.getEmail());
                traineeRepository.save(trainee1);
                user.setTrainee(trainee1);
            } else {
                user.setTrainee(trainee.get());
            }
        }
        Role setRole = roleRepo.getRoleByRoleName(roleName);
        Set<Role> role = user.getRole();
        role.add(setRole);
        user.setRole(role);
        userRepository.save(user);
        return new RoleResponse("Role assigned successfully.", email, setRole);
    }
    public RoleResponse removeUserRole(String email, String roleName)  throws Exception {
        User user = userData.get(email);
        if(user == null) throw new UsernameNotFoundException("User not found: " + email);
        if(roleName.equals("TRAINER")) {
            if(user.getRole().stream().anyMatch(role -> (role.getRoleName().equals("TRAINEE")))) throw new Exception("Please remove Trainee Role first.");
            user.setTrainer(null);
        } else if(roleName.equals("ADMIN")) {
            user.setAdmin(null);
        } else if(roleName.equals("TRAINEE")) {
            user.setTrainee(null);
        }
        Role setRole = roleRepo.getRoleByRoleName(roleName);
        Set<Role> roles = user.getRole().stream().filter(role -> !role.getRoleName().equals(roleName)).collect(Collectors.toSet());;
        user.setRole(roles);
        userRepository.save(user);
        return new RoleResponse("Role removed successfully.", email, setRole);
    }
    public UserResponse editUserData(String token, User user)  throws UsernameNotFoundException {
        User userDB = userData.get(user.getEmail());
        if(userDB == null) throw new UsernameNotFoundException("User not found: " + user.getEmail());
        User currentUser = userData.get(jwtUtil.getUserNameFromToken(token.substring(7)));
        Set<SimpleGrantedAuthority> currentUserRole = AuthService.getAuthority(currentUser);
        //using Lambda Expression with Stream
        boolean isAdmin = currentUserRole.stream().anyMatch(role -> (role.getAuthority().equals("ROLE_ADMIN")));
        if(currentUser.getEmail().equals(user.getEmail()) || isAdmin) {
        }
        else throw new SecurityException("Profile edit access denied: "+ user.getEmail());
        user.setPassword(userDB.getPassword());
        userRepository.save(user);
        user.setPassword(null);
        return new UserResponse("User data updated.", user);
    }
    public DashboardResponse getDashboard(String token)  throws Exception {
        List<User> users = userRepository.findAll();
        CoursesResponse coursesResponse = courseService.getCourseData(token);
        BatchesResponse batchesResponse = batchService.getBatchData(token);

        return new DashboardResponse("Dashboard data collected", users, batchesResponse.getPreviousBatches().size(), batchesResponse.getRunningBatches().size(), batchesResponse.getUpcomingBatches().size(), coursesResponse.getPreviousCourses().size(), coursesResponse.getRunningCourses().size(), coursesResponse.getUpcomingCourses().size());
    }
    public UserResponse deleteUserData(String email)  throws UsernameNotFoundException {
        User user = userData.get(email);
        if(user == null) throw new UsernameNotFoundException("User not found: " + email);
        userRepository.deleteById(email);
        return new UserResponse("User data deleted.", new User());
    }
}
