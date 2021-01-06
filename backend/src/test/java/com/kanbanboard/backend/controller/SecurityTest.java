package com.kanbanboard.backend.controller;



import com.fasterxml.jackson.databind.ObjectMapper;
import com.kanbanboard.backend.model.User;
import org.junit.jupiter.api.BeforeEach;
//import org.junit.Test;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class SecurityTest {

    @Autowired
    MockMvc mockMvc;

    User user;

    @BeforeEach
    void setUp() {
        this.user = new User();
        user.setUsername("test1");
        user.setFirstname("test1");
        user.setLastname("test1");
        user.setPassword("test1");
    }

    @Test
    public void shouldReturnForbiddenWithoutToken() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders.get("/issues/1")).andExpect(status().isForbidden());
    }

    @Test
    public void shouldWorksWhenTokenIsProvided() throws Exception {
        String url = "http://localhost:8080/projects/5fad483c34948f4a6cae302e";
        String validToken = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MSIsImV4cCI6MTYwOTI5OTk4MiwiaWF0IjoxNjA5MjYzOTgyfQ.h4hAmFH8NRpD_n5XwOxg4xBG01dwrnnA86fsM1iJ7N8";

        this.mockMvc.perform(MockMvcRequestBuilders.get(url).header("Authorization",validToken)).andExpect(status().isOk());
    }

    @Test
    public void shouldReturnConflictWhenUserNameExistsAlready() throws Exception {
        ObjectMapper mapperObj = new ObjectMapper();
        String json = mapperObj.writeValueAsString(this.user);
        String url = "http://localhost:8080/user/register";

        this.mockMvc.perform(MockMvcRequestBuilders.post(url).contentType(MediaType.APPLICATION_JSON)
                .content(json)).andDo(print()).andExpect(status().isConflict());

    }
}
