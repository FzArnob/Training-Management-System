package com.backend.tms.service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import com.backend.tms.exception.UserAlreadyExistException;
import com.backend.tms.functional.UserData;
import com.backend.tms.request.AuthRequest;
import com.backend.tms.response.AuthResponse;
import com.backend.tms.model.User;
import com.backend.tms.repository.UserRepository;
import com.backend.tms.response.UserResponse;
import com.backend.tms.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService{

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AuthenticationManager authenticationManager;
    //using Lambda Expression using Functional Interface
    private final UserData userData = (email) -> {
        Optional<User> user = userRepository.findById(email);
        if(user.isPresent()) return user.get();
        return null;
    };
    public String createRefreshToken(String email) throws UsernameNotFoundException, BadCredentialsException, DisabledException {
        return jwtUtil.generateToken(loadUserByUsername(email));
    }
    public AuthResponse createJwtToken(AuthRequest authRequest)  throws UsernameNotFoundException, BadCredentialsException, DisabledException {
        String newGeneratedToken = jwtUtil.generateToken(loadUserByUsername(authRequest.getEmail()));
        authenticate(authRequest.getEmail(), authRequest.getPassword());
        User user = userData.get(authRequest.getEmail());
        user.setPassword(null);
        return new AuthResponse("User login successful", user, newGeneratedToken);
    }
	public AuthResponse getUserDetails(String token)  throws UsernameNotFoundException {
        User user = userData.get(jwtUtil.getUserNameFromToken(token.substring(7)));
        user.setPassword(null);
        return new AuthResponse("User login successful", user, token.substring(7));
	}
    public UserResponse createNewUser(User user) throws UserAlreadyExistException {
        if(userData.get(user.getEmail()) != null) throw new UserAlreadyExistException("User already exist: " + user.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        user.setRole(new HashSet<>());
        userRepository.save(user);
        user.setPassword(null);
        return new UserResponse("User created successfully: "+ user.getEmail(), user);
    }
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userData.get(email);
        if(user != null) return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), getAuthority(user));
        throw new UsernameNotFoundException("User not found: " + email);
    }
	
	protected static Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        //using Lambda Expression with Foreach
        user.getRole().forEach(role -> authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRoleName())));
        return authorities;
    }

	private void authenticate(String email, String password) throws DisabledException, BadCredentialsException {
		try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (DisabledException e) {
            throw new DisabledException("User is disabled", e);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid credentials", e);
        }
	}
}
