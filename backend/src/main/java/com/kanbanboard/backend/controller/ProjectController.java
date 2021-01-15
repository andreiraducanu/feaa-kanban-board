package com.kanbanboard.backend.controller;

import com.kanbanboard.backend.dto.*;
import com.kanbanboard.backend.exception.EntityNotFoundException;
import com.kanbanboard.backend.exception.ServerException;
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
    ResponseEntity<ProjectItemDto> createProject(@Valid @RequestBody ProjectCreateDto projectCreateDto) throws EntityNotFoundException {
        return new ResponseEntity<>(projectService.create(projectCreateDto), HttpStatus.CREATED);
    }

    @GetMapping("/projects")
    ResponseEntity<List<ProjectItemDto>> getProjects(@RequestParam(name = "owner", required = false) String ownerFilter) throws EntityNotFoundException {
        return new ResponseEntity<>(projectService.getAll(ownerFilter), HttpStatus.OK);
    }

    @GetMapping("/projects/{id}")
    ResponseEntity<ProjectDto> getProject(@PathVariable(name = "id") String idProject) throws EntityNotFoundException {
        return new ResponseEntity<>(projectService.getById(idProject), HttpStatus.OK);
    }

    @PutMapping("/projects/{id}")
    ResponseEntity<ProjectDto> updateProject(@PathVariable(name = "id") String idProject, @Valid @RequestBody ProjectUpdateDto projectUpdateDto) throws EntityNotFoundException {
        return new ResponseEntity<>(projectService.updateById(idProject, projectUpdateDto), HttpStatus.OK);
    }

    @DeleteMapping("/projects/{id}")
    ResponseEntity<String> deleteProject(@PathVariable(name = "id") String idProject) throws EntityNotFoundException {
        return new ResponseEntity<>(projectService.deleteById(idProject), HttpStatus.OK);
    }

    @PostMapping("/projects/{id}/members")
    ResponseEntity<ProjectDto> addMemberToProject(@PathVariable(name = "id") String idProject, @Valid @RequestBody ProjectAddMemberDto projectAddMemberDto) throws ServerException, EntityNotFoundException {
        return new ResponseEntity<>(projectService.addMember(idProject, projectAddMemberDto), HttpStatus.OK);
    }

    @PutMapping("/projects/{idProject}/issues/{idIssue}/move")
    ResponseEntity<ProjectDto> moveIssue(
            @PathVariable(name = "idProject") String idProject,
            @PathVariable(name = "idIssue") String idIssue,
            @Valid @RequestBody IssueMoveDto issueMoveDto) throws EntityNotFoundException {
        return new ResponseEntity<>(projectService.moveIssue(idProject, idIssue, issueMoveDto), HttpStatus.OK);
    }
}
