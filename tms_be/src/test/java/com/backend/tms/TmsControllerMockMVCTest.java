package com.backend.tms;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//import java.io.StringReader;
//import java.io.UnsupportedEncodingException;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import javax.xml.xpath.XPath;
//import javax.xml.xpath.XPathExpressionException;
//import javax.xml.xpath.XPathFactory;
//
//import org.dom4j.io.XMLResult;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class TmsControllerMockMVCTest {
	@Autowired
    private MockMvc mockMvc;
	
	private String admin_token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2aW5jZW50QGNhY2FkZW15LmNvbSIsImV4cCI6MTY1OTE3NjMzNCwiaWF0IjoxNjU4NzQ0MzM0fQ.DPRGohgK5_J-ZFIaeWxR0Ih0syTAh2n0jXEr49bo57WXswcIehJ0E_epbM0uGb9-f-4AgQfjtFGfGHpSYk52Hw";

	
	@Before
    public void setup()
    {
    	System.out.println("[Started] - Integration Test");
    }
	
    @Test
    public void testTraineeApply() throws Exception {
    	String requestBody="{\n" +
                "  \"email\":\"fz.arnob13@gmail.com\",\n" +
                "  \"password\":\"123\",\n" +
                "  \"firstName\":\"Md. Farhan\",\n" +
                "  \"lastName\":\"Zaman\",\n" +
                "  \"address\":\"35, Lakecircus, Kalabagan\",\n" +
                "  \"dateOfBirth\":\"1999-09-30\",\n" +
                "  \"gender\":\"Male\",\n" +
                "  \"phone\": 1521581368,\n" +
                "  \"profilePicture\":\"http://localhost:8080/api/downloadFile/Rd7YomAc\",\n" +
                "  \"trainee\":{\n" +
                "    \"nidNo\":641255,\n" +
                "    \"experience\":1,\n" +
                "    \"bloodGroup\":\"AB+\",\n" +
                "    \"institute\":\"BRAC University\",\n" +
                "    \"cgpa\":3.76,\n" +
                "    \"resume\":\"http://localhost:8080/api/downloadFile/RhBgIAtJ\"\n" +
                "  }\n" +
                "}";
    	this.mockMvc.perform(post("/api/trainee/apply").content(requestBody).contentType(MediaType.APPLICATION_JSON)).andExpect(status().is2xxSuccessful());
    }
    @Test
    public void testApplicationProcessFeature() throws Exception {
        String requestBody="{\n" +
                "        \"email\": \"fz.arnob13@gmail.com\",\n" +
                "        \"statusName\": \"EXAM\"\n" +
                "    }";
        this.mockMvc.perform(post("/api/trainee/application-status").content(requestBody).contentType(MediaType.APPLICATION_JSON).header(HttpHeaders.AUTHORIZATION, "Bearer " + admin_token)).andExpect(status().is2xxSuccessful());
    }
    @Test
    public void testAssignRoleByAdminFeature() throws Exception {
        String requestBody="{\n" +
                "        \"email\": \"fz.arnob13@gmail.com\",\n" +
                "        \"roleName\": \"TRAINEE\"\n" +
                "    }";
        this.mockMvc.perform(post("/api/user/assign-role").content(requestBody).contentType(MediaType.APPLICATION_JSON).header(HttpHeaders.AUTHORIZATION, "Bearer " + admin_token)).andExpect(status().is2xxSuccessful());
    }
    @Test
    public void testAutoLoginFeature() throws Exception {
    	this.mockMvc.perform(get("/api/auth/auto-login").header(HttpHeaders.AUTHORIZATION, "Bearer " + admin_token)).andExpect(status().is2xxSuccessful());
    }
    @Test
    public void testGetDashboardData() throws Exception {
        this.mockMvc.perform(get("/api/user/get/dashboard").header(HttpHeaders.AUTHORIZATION, "Bearer " + admin_token)).andExpect(status().is2xxSuccessful());
    }
    @Test
    public void testGetProfileData() throws Exception {
        this.mockMvc.perform(get("/api/user/get/fz.arnob13@gmail.com").header(HttpHeaders.AUTHORIZATION, "Bearer " + admin_token)).andExpect(status().is2xxSuccessful());
    }
    @Test
    public void testGetCourseData() throws Exception {
        this.mockMvc.perform(get("/api/course/get/all").header(HttpHeaders.AUTHORIZATION, "Bearer " + admin_token)).andExpect(status().is2xxSuccessful());
    }
    @Test
    public void testGetBatchData() throws Exception {
        this.mockMvc.perform(get("/api/batch/get/all").header(HttpHeaders.AUTHORIZATION, "Bearer " + admin_token)).andExpect(status().is2xxSuccessful());
    }
    @Test
    public void testDeleteUser() throws Exception {
        this.mockMvc.perform(delete("/api/user/delete/fz.arnob13@gmail.com").header(HttpHeaders.AUTHORIZATION, "Bearer " + admin_token)).andExpect(status().is2xxSuccessful());
    }
    @After
    public void tearDown()
    {
    	System.out.println("[Ended] - Integration Test");
    }
}
