package com.kanbanboard.backend.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kanbanboard.backend.dto.IssueCreateDto;
import com.kanbanboard.backend.model.enums.IssuePriority;
import com.kanbanboard.backend.model.enums.IssueType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class IssueTest {

    @Autowired
    MockMvc mockMvc;

    IssueCreateDto issueCreateDto;

    @BeforeEach
    void setUp(){
        issueCreateDto = new IssueCreateDto();
        issueCreateDto.setAssigneeUsername("test");
        issueCreateDto.setDescription("test");
        issueCreateDto.setProjectId("5fad483c34948f4a6cae302e");
        issueCreateDto.setType(IssueType.EPIC);
        issueCreateDto.setPriority(IssuePriority.HIGH);
        issueCreateDto.setTitle("test");
        issueCreateDto.setReporterUsername("test");
    }

    @Test
    void shouldReturnNotFoundWhenIdIssueDoesntExists() throws Exception {
        String url = "http://localhost:8080/issue/idWhichDoesntExists";
        String token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MSIsImV4cCI6MTYwOTM3NTIxOCwiaWF0IjoxNjA5MzM5MjE4fQ.YE6vJCX0SusMI5WeG-bsubdZY6UAXF9xZ_sbaTdNKyE";

        this.mockMvc.perform(MockMvcRequestBuilders.delete(url).header("Authorization",token)).andDo(print()).andExpect(status().isNotFound());
    }

    @Test
    void shouldReturnOkWhenAddIssueAndRequestDataIsOk() throws Exception {
        ObjectMapper mapperObj = new ObjectMapper();
        String json = mapperObj.writeValueAsString(this.issueCreateDto);
        String url = "http://localhost:8080/issues";
        String token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MSIsImV4cCI6MTYwOTM3NTIxOCwiaWF0IjoxNjA5MzM5MjE4fQ.YE6vJCX0SusMI5WeG-bsubdZY6UAXF9xZ_sbaTdNKyE";

        this.mockMvc.perform(MockMvcRequestBuilders.post(url).contentType(MediaType.APPLICATION_JSON)
                .content(json).header("Authorization", token)).andDo(print()).andExpect(status().isOk());
    }
}
