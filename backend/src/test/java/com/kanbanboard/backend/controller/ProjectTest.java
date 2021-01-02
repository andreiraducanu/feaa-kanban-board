package com.kanbanboard.backend.controller;

import net.minidev.json.parser.JSONParser;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.junit.Assert.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ProjectTest {

    @Autowired
    MockMvc mockMvc;

    @BeforeEach
    void setUp() {

    }

    @Test
    void shouldReturnAllProjects() throws Exception {
        String url = "http://localhost:8080/projects";
        String token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MSIsImV4cCI6MTYwOTM3NTIxOCwiaWF0IjoxNjA5MzM5MjE4fQ.YE6vJCX0SusMI5WeG-bsubdZY6UAXF9xZ_sbaTdNKyE";

        MvcResult mvcResult = this.mockMvc.perform(MockMvcRequestBuilders.get(url).header("Authorization", token)).andReturn();
        String response = mvcResult.getResponse().getContentAsString();
        JSONArray jsonArray = new JSONArray(response);

        assertEquals(4, jsonArray.length());
    }

}
