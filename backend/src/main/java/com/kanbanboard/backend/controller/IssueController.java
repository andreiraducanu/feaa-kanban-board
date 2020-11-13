package com.kanbanboard.backend.controller;

import com.kanbanboard.backend.dto.*;
import com.kanbanboard.backend.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class IssueController {

    private final IssueService issueService;

    @Autowired
    IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @PostMapping("/issues")
    ResponseEntity<IssueDto> createIssue(@Valid @RequestBody IssueCreateDto issueCreateDto) {
        return new ResponseEntity<>(issueService.create(issueCreateDto), HttpStatus.OK);
    }

    @GetMapping("/issues/{id}")
    ResponseEntity<IssueDto> getIssue(@PathVariable(name = "id") String idIssue) {
        return new ResponseEntity<>(issueService.getById(idIssue), HttpStatus.OK);
    }

    @PutMapping("/issues/{id}")
    ResponseEntity<IssueDto> updateIssue(@PathVariable(name = "id") String idIssue, @Valid @RequestBody IssueUpdateDto issueUpdateDto) {
        return new ResponseEntity<>(issueService.updateById(idIssue, issueUpdateDto), HttpStatus.OK);
    }

    @DeleteMapping("/issues/{id}")
    ResponseEntity<String> deleteIssue(@PathVariable(name = "id") String idIssue) {
        return new ResponseEntity<>(issueService.deleteById(idIssue), HttpStatus.OK);
    }

    @PostMapping("/issues/{id}/children")
    ResponseEntity<IssueDto> addChildToIssue(@PathVariable(name = "id") String idIssue, @Valid @RequestBody IssueAddChildDto issueAddChildDto) {
        return new ResponseEntity<>(issueService.addChild(idIssue, issueAddChildDto), HttpStatus.OK);
    }

    @DeleteMapping("/issues/{id}/children")
    ResponseEntity<IssueDto> removeChildFromIssue(@PathVariable(name = "id") String idIssue, @Valid @RequestBody IssueRemoveChildDto issueRemoveChildDto) {
        return new ResponseEntity<>(issueService.removeChild(idIssue, issueRemoveChildDto), HttpStatus.OK);
    }

    @PostMapping("/issues/{id}/worklogs")
    ResponseEntity<WorkLogDto> addWorkLog(@PathVariable(name = "id") String idIssue, @Valid @RequestBody WorkLogCreateDto workLogCreateDto) {
        return new ResponseEntity<>(issueService.addWorkLog(idIssue, workLogCreateDto), HttpStatus.CREATED);
    }

    @PutMapping("/issues/{idIssue}/worklogs/{idWorkLog}")
    ResponseEntity<WorkLogDto> updateWorkLog(@PathVariable(name = "idIssue") String idIssue, @PathVariable(name = "idWorkLog") String idWorkLog, @Valid @RequestBody WorkLogUpdateDto workLogUpdateDto) {
        return new ResponseEntity<>(issueService.updateWorkLog(idIssue, idWorkLog, workLogUpdateDto), HttpStatus.OK);
    }

    @DeleteMapping("/issues/{idIssue}/worklogs/{idWorkLog}")
    ResponseEntity<String> deleteWorkLog(@PathVariable(name = "idIssue") String idIssue, @PathVariable(name = "idWorkLog") String idWorkLog) {
        return new ResponseEntity<>(issueService.deleteWorkLog(idIssue, idWorkLog), HttpStatus.OK);
    }

    @PostMapping("/issues/{id}/comments")
    ResponseEntity<CommentDto> addComment(@PathVariable(name = "id") String idIssue, @Valid @RequestBody CommentCreateDto commentCreateDto) {
        return new ResponseEntity<>(issueService.addComment(idIssue, commentCreateDto), HttpStatus.CREATED);
    }

    @PutMapping("/issues/{idIssue}/comments/{idComment}")
    ResponseEntity<CommentDto> updateComment(@PathVariable(name = "idIssue") String idIssue, @PathVariable(name = "idComment") String idComment, @Valid @RequestBody CommentUpdateDto commentUpdateDto) {
        return new ResponseEntity<>(issueService.updateComment(idIssue, idComment, commentUpdateDto), HttpStatus.OK);
    }

    @DeleteMapping("/issues/{idIssue}/comments/{idComment}")
    ResponseEntity<String> deleteComment(@PathVariable(name = "idIssue") String idIssue, @PathVariable(name = "idComment") String idComment) {
        return new ResponseEntity<>(issueService.deleteComment(idIssue, idComment), HttpStatus.OK);
    }
}