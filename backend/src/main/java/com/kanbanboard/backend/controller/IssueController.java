package com.kanbanboard.backend.controller;

import com.kanbanboard.backend.dto.*;
import com.kanbanboard.backend.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

public class IssueController {
    private final IssueService issueService;

    @Autowired
    IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @PostMapping("/issues")
    ResponseEntity<IssueDto> createIssue(@Valid @RequestBody IssueDto issueDto) {
        return null;
    }

    @GetMapping("/issues/{id}")
    ResponseEntity<IssueDto> getIssues(@PathVariable(name = "id") String id) {
        return null;
    }

    // FIXME
    @PutMapping("/issues/{id}")
    ResponseEntity<IssueDto> updateIssue(@PathVariable(name = "id") String id, @Valid @RequestBody ProjectUpdateDto projectDto) {
        return null;
    }

    @DeleteMapping("/issues/{id}")
    ResponseEntity<String> deleteIssue(@PathVariable(name = "id") String id) {
        issueService.deleteById(id);
        return new ResponseEntity<>("Ok", HttpStatus.OK);
    }

    @PostMapping("/issues/{id}/comments")
    ResponseEntity<IssueDto> addComment(@PathVariable(name = "id") String id, @Valid @RequestBody CommentDto commentDto) {
        return new ResponseEntity<IssueDto>(issueService.addComment(commentDto, id), HttpStatus.OK);
    }

    @PutMapping("/issues/{idIssue}/comments/{idComment}")
    ResponseEntity<IssueDto> updateComment(@PathVariable(name = "idIssue") String idIssue, @PathVariable(name = "idComment") String idComment, @Valid @RequestBody CommentDto commentDto) {
        return new ResponseEntity<IssueDto>(issueService.changeComment(commentDto, idIssue, idComment), HttpStatus.OK);
    }

    @DeleteMapping("/issues/{idIssue}/comments/{idComment}")
    ResponseEntity<String> deleteComment(@PathVariable(name = "idIssue") String idIssue, @PathVariable(name = "idComment") String idComment) {
        return new ResponseEntity<String>(issueService.deleteComment(idIssue, idComment), HttpStatus.OK);
    }

    @PostMapping("/issues/{id}/children")
    ResponseEntity<IssueDto> addChildren(@PathVariable(name = "id") String id, @Valid @RequestBody IssueDto issueDto) {
        return new ResponseEntity<IssueDto>(issueService.addChild(id, issueDto), HttpStatus.OK);
    }


    @PostMapping("/issues/{id}/worklogs")
    ResponseEntity<IssueDto> addWorklog(@PathVariable(name = "id") String id, @Valid @RequestBody WorkLogCreationDto workLogCreationDto) {
        return new ResponseEntity<>(issueService.addWorklog(id, workLogCreationDto), HttpStatus.CREATED);
    }


    @PutMapping("/issues/{idIssue}/worklogs/{idWorklog}")
    ResponseEntity<IssueDto> updateWorklog(@PathVariable(name = "idIssue") String idIssue, @PathVariable(name = "idWorklog") String idWorklog, @Valid @RequestBody WorkLogUpdateDto workLogUpdateDto) {
        return null;
    }

    @DeleteMapping("/issues/{idIssue}/worklogs/{idWorklog}")
    ResponseEntity<String> deleteWorklog(@PathVariable(name = "idIssue") String idIssue, @PathVariable(name = "idWorklog") String idWorklog) {
        issueService.deleteWorklog(idIssue, idWorklog);
        return new ResponseEntity<>("Ok", HttpStatus.OK);
    }
}