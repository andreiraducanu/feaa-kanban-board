package com.kanbanboard.backend.controller;

import com.kanbanboard.backend.dto.ProjectAddMemberDto;
import com.kanbanboard.backend.dto.ProjectCreateDto;
import com.kanbanboard.backend.dto.ProjectDto;
import com.kanbanboard.backend.dto.ProjectUpdateDto;
import com.kanbanboard.backend.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class ProjectController {

    private final ProjectService projectService;

    @Autowired
    ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping("/projects")
    ResponseEntity<ProjectDto> createProject(@Valid @RequestBody ProjectCreateDto projectCreateDto) {
        return new ResponseEntity<>(projectService.create(projectCreateDto), HttpStatus.CREATED);
    }

    @GetMapping("/projects")
    ResponseEntity<List<ProjectDto>> getProjects(@RequestParam(name = "owner", required = false) String ownerFilter) {
        return new ResponseEntity<>(projectService.getAll(ownerFilter), HttpStatus.OK);
    }

    @GetMapping("/projects/{id}")
    ResponseEntity<ProjectDto> getProject(@PathVariable(name = "id") String idProject) {
        return new ResponseEntity<>(projectService.getById(idProject), HttpStatus.OK);
    }

    @PutMapping("/projects/{id}")
    ResponseEntity<ProjectDto> updateProject(@PathVariable(name = "id") String idProject, @Valid @RequestBody ProjectUpdateDto projectUpdateDto) {
        return new ResponseEntity<>(projectService.updateById(idProject, projectUpdateDto), HttpStatus.OK);
    }

    @DeleteMapping("/projects/{id}")
    ResponseEntity<String> deleteProject(@PathVariable(name = "id") String idProject) {
        return new ResponseEntity<>(projectService.deleteById(idProject), HttpStatus.OK);
    }

    @PostMapping("/projects/{id}/members")
    ResponseEntity<ProjectDto> addMemberToProject(@PathVariable(name = "id") String idProject, @Valid @RequestBody ProjectAddMemberDto projectAddMemberDto) {
        return new ResponseEntity<>(projectService.addMember(idProject, projectAddMemberDto), HttpStatus.OK);
    }
}
