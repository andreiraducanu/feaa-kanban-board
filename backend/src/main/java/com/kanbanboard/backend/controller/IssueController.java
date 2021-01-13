package com.kanbanboard.backend.controller;

import com.kanbanboard.backend.dto.*;
import com.kanbanboard.backend.exception.EntityNotFoundException;
import com.kanbanboard.backend.exception.ServerException;
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
    ResponseEntity<IssueDto> createIssue(@Valid @RequestBody IssueCreateDto issueCreateDto) throws ServerException, EntityNotFoundException {
        return new ResponseEntity<>(issueService.create(issueCreateDto), HttpStatus.CREATED);
    }

    @GetMapping("/issues/{id}")
    ResponseEntity<IssueDto> getIssue(@PathVariable(name = "id") String idIssue) throws EntityNotFoundException {
        return new ResponseEntity<>(issueService.getById(idIssue), HttpStatus.OK);
    }

    @PutMapping("/issues/{id}")
    ResponseEntity<IssueDto> updateIssue(@PathVariable(name = "id") String idIssue, @Valid @RequestBody IssueUpdateDto issueUpdateDto) throws EntityNotFoundException {
        return new ResponseEntity<>(issueService.updateById(idIssue, issueUpdateDto), HttpStatus.OK);
    }

    @PutMapping("/issues/{id}/move")
    ResponseEntity<IssueDto> moveIssue(@PathVariable(name = "id") String idIssue, @Valid @RequestBody IssueMoveDto issueMoveDto) throws EntityNotFoundException {
        return new ResponseEntity<>(issueService.moveById(idIssue, issueMoveDto), HttpStatus.OK);
    }

    @DeleteMapping("/issues/{id}")
    ResponseEntity<String> deleteIssue(@PathVariable(name = "id") String idIssue) throws EntityNotFoundException {
        return new ResponseEntity<>(issueService.deleteById(idIssue), HttpStatus.OK);
    }

    @PostMapping("/issues/{id}/children")
    ResponseEntity<IssueDto> addChildToIssue(@PathVariable(name = "id") String idIssue, @Valid @RequestBody IssueAddChildDto issueAddChildDto) throws ServerException, EntityNotFoundException {
        return new ResponseEntity<>(issueService.addChild(idIssue, issueAddChildDto), HttpStatus.OK);
    }

    @DeleteMapping("/issues/{id}/children/{idChild}")
    ResponseEntity<IssueDto> removeChildFromIssue(@PathVariable(name = "id") String idIssue, @PathVariable(name = "idChild") String idChild) throws ServerException, EntityNotFoundException {
        return new ResponseEntity<>(issueService.removeChild(idIssue, idChild), HttpStatus.OK);
    }

    @PostMapping("/issues/{id}/worklogs")
    ResponseEntity<WorkLogDto> addWorkLog(@PathVariable(name = "id") String idIssue, @Valid @RequestBody WorkLogCreateDto workLogCreateDto) throws ServerException, EntityNotFoundException {
        return new ResponseEntity<>(issueService.addWorkLog(idIssue, workLogCreateDto), HttpStatus.CREATED);
    }

    @PutMapping("/issues/{idIssue}/worklogs/{idWorkLog}")
    ResponseEntity<WorkLogDto> updateWorkLog(@PathVariable(name = "idIssue") String idIssue, @PathVariable(name = "idWorkLog") String idWorkLog, @Valid @RequestBody WorkLogUpdateDto workLogUpdateDto) throws ServerException, EntityNotFoundException {
        return new ResponseEntity<>(issueService.updateWorkLog(idIssue, idWorkLog, workLogUpdateDto), HttpStatus.OK);
    }

    @DeleteMapping("/issues/{idIssue}/worklogs/{idWorkLog}")
    ResponseEntity<String> deleteWorkLog(@PathVariable(name = "idIssue") String idIssue, @PathVariable(name = "idWorkLog") String idWorkLog) throws ServerException, EntityNotFoundException {
        return new ResponseEntity<>(issueService.deleteWorkLog(idIssue, idWorkLog), HttpStatus.OK);
    }

    @PostMapping("/issues/{id}/comments")
    ResponseEntity<CommentDto> addComment(@PathVariable(name = "id") String idIssue, @Valid @RequestBody CommentCreateDto commentCreateDto) throws ServerException, EntityNotFoundException {
        return new ResponseEntity<>(issueService.addComment(idIssue, commentCreateDto), HttpStatus.CREATED);
    }

    @PutMapping("/issues/{idIssue}/comments/{idComment}")
    ResponseEntity<CommentDto> updateComment(@PathVariable(name = "idIssue") String idIssue, @PathVariable(name = "idComment") String idComment, @Valid @RequestBody CommentUpdateDto commentUpdateDto) throws ServerException, EntityNotFoundException {
        return new ResponseEntity<>(issueService.updateComment(idIssue, idComment, commentUpdateDto), HttpStatus.OK);
    }

    @DeleteMapping("/issues/{idIssue}/comments/{idComment}")
    ResponseEntity<String> deleteComment(@PathVariable(name = "idIssue") String idIssue, @PathVariable(name = "idComment") String idComment) throws ServerException, EntityNotFoundException {
        return new ResponseEntity<>(issueService.deleteComment(idIssue, idComment), HttpStatus.OK);
    }
}