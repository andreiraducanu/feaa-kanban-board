package com.kanbanboard.backend.controller;

import com.kanbanboard.backend.dto.ProjectAddMemberDto;
import com.kanbanboard.backend.dto.ProjectCreationDto;
import com.kanbanboard.backend.dto.ProjectUpdateDto;
import com.kanbanboard.backend.model.Project;
import com.kanbanboard.backend.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class ProjectController {

    private final ProjectService projectService;

    @Autowired
    ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping("/projects")
    ResponseEntity<Project> createProject(@Valid @RequestBody ProjectCreationDto projectDto) {
        return new ResponseEntity<>(projectService.create(projectDto), HttpStatus.CREATED);
    }

    @PostMapping("/projects/{id}/members")
    ResponseEntity<Project> addMember(@PathVariable("id") String id, @Valid @RequestBody ProjectAddMemberDto memberIdDto) {
        return new ResponseEntity<>(projectService.addMember(id, memberIdDto), HttpStatus.CREATED);
    }

    @PutMapping("/projects/{id}")
    ResponseEntity<Project> updateProject(@PathVariable("id") String id, @Valid @RequestBody ProjectUpdateDto projectDto) {
        return new ResponseEntity<>(projectService.updateById(id, projectDto), HttpStatus.OK);
    }

    @DeleteMapping("/projects/{id}")
    ResponseEntity<String> deleteProject(@PathVariable("id") String id) {
        projectService.deleteById(id);
        return new ResponseEntity<>("Ok", HttpStatus.OK);
    }

    @GetMapping("/projects/{id}")
    ResponseEntity<Project> getProject(@PathVariable("id") String id) {
        return new ResponseEntity<>(projectService.getById(id), HttpStatus.OK);
    }
}
