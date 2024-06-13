package com.backend.tms.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.backend.tms.service.AuthService;
import com.backend.tms.util.JwtUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;



import io.jsonwebtoken.ExpiredJwtException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter{

	@Autowired
	private AuthService authService;
	@Autowired
	private JwtUtil jwtUtil;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		final String header = request.getHeader("Authorization");
		final String url = request.getRequestURI();
		String jwtToken = null;
		String email = null;
        if (header != null && header.startsWith("Bearer ")) {
            jwtToken = header.substring(7);
            try {
				email = jwtUtil.getUserNameFromToken(jwtToken);
            } catch (ExpiredJwtException e) {
				logger.warn("Login session is expired");
				request.setAttribute("exMsg", "Login session is expired");
            } catch (Exception e){
				logger.warn("Login session is invalid");
				request.setAttribute("exMsg", "Login session is invalid");
			}
        } else if (url.endsWith("/api/auth/login")) {
			logger.info("Public access: login");
		} else if (url.endsWith("/api/auth/register")) {
			logger.info("Public access: register");
		} else if (url.endsWith("/api/trainee/apply")) {
			logger.info("Public access: apply");
		} else if (url.endsWith("/api/uploadFile")) {
			logger.info("Public access: upload File");
		} else if (url.contains("/api/downloadFile/")) {
			logger.info("Public access: download File");
		} else {
			logger.warn("Token should start with Bearer");
		}
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        	UserDetails userDetails = authService.loadUserByUsername(email);
        	if (jwtUtil.validateToken(jwtToken, userDetails)) {
        		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        		usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        		SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        	}
        }
        filterChain.doFilter(request, response);
	}

	public String convertObjectToJson(Object object) throws JsonProcessingException {
		if (object == null) {
			return null;
		}
		ObjectMapper mapper = new ObjectMapper();
		return mapper.writeValueAsString(object);
	}

}
