package com.backend.tms.service;

import com.backend.tms.functional.UserData;
import com.backend.tms.model.*;
import com.backend.tms.repository.*;
import com.backend.tms.response.CourseResponse;
import com.backend.tms.response.CoursesResponse;
import com.backend.tms.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.Set;

@Service
public class CourseService {
    @Autowired
    RoleRepository roleRepo;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private TrainerRepository trainerRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;
    private final UserData userData = (email) -> {
        Optional<User> user = userRepository.findById(email);
        if(user.isPresent()) return user.get();
        return null;
    };

    public CoursesResponse getCourseData(String token) throws Exception {
        User currentUser = userData.get(jwtUtil.getUserNameFromToken(token.substring(7)));
        Set<SimpleGrantedAuthority> currentUserRole = AuthService.getAuthority(currentUser);
        //using Lambda Expression with Stream
        boolean isAdmin = currentUserRole.stream().anyMatch(role -> (role.getAuthority().equals("ROLE_ADMIN")));
        boolean isTrainer = currentUserRole.stream().anyMatch(role -> (role.getAuthority().equals("ROLE_TRAINER")));
        boolean isTrainee = currentUserRole.stream().anyMatch(role -> (role.getAuthority().equals("ROLE_TRAINEE")));
        if(isAdmin || isTrainer) {
            return new CoursesResponse("Courses collected", courseRepository.findByStatus("previous"), courseRepository.findByStatus("running"), courseRepository.findByStatus("upcoming"));
        } else if(isTrainee){
            return new CoursesResponse("Courses collected", new ArrayList<>(), courseRepository.findByStatus("running"), courseRepository.findByStatus("upcoming"));
        }
        return new CoursesResponse("Courses collected", new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
    }

    public CourseResponse saveCourseData(String token, Course course)  throws Exception {
        Optional<Course> courseDB = courseRepository.findById(course.getCourseCode());
        if(courseDB.isPresent()) throw new Exception("Course already exist: " + course.getCourseCode());
        courseRepository.save(course);
        return new CourseResponse("Course added.", course);
    }
    public CourseResponse updateCourseData(String token, Course course)  throws Exception {
        Optional<Course> courseDB = courseRepository.findById(course.getCourseCode());
        if(courseDB.isEmpty()) throw new Exception("Course not found: " + course.getCourseCode());
        courseRepository.save(course);
        return new CourseResponse("Course updated.", course);
    }
}
