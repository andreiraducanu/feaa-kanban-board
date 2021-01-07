package com.kanbanboard.backend.service;

import com.kanbanboard.backend.dto.*;
import com.kanbanboard.backend.exception.EntityNotFoundException;
import com.kanbanboard.backend.exception.ServerException;
import com.kanbanboard.backend.model.WorkLog;

public interface IssueService {

    IssueDto create(IssueCreateDto issueCreateDto) throws EntityNotFoundException, ServerException;

    IssueDto getById(String idIssue) throws EntityNotFoundException;

    IssueDto updateById(String idIssue, IssueUpdateDto issueUpdateDto) throws EntityNotFoundException;

    String deleteById(String idIssue) throws EntityNotFoundException;

    IssueDto addChild(String idIssue, IssueAddChildDto issueAddChildDto) throws EntityNotFoundException, ServerException;

    IssueDto removeChild(String idIssue, String idChild) throws EntityNotFoundException, ServerException;

    WorkLogDto addWorkLog(String idIssue, WorkLogCreateDto workLogCreateDto) throws EntityNotFoundException, ServerException;

    WorkLogDto updateWorkLog(String idIssue, String idWorkLog, WorkLogUpdateDto workLogUpdateDto) throws EntityNotFoundException, ServerException;

    String deleteWorkLog(String idIssue, String idWorkLog) throws EntityNotFoundException, ServerException;

    CommentDto addComment(String idIssue, CommentCreateDto commentCreateDto) throws EntityNotFoundException, ServerException;

    CommentDto updateComment(String idIssue, String idComment, CommentUpdateDto commentDto) throws EntityNotFoundException, ServerException;

    String deleteComment(String idIssue, String idComment) throws EntityNotFoundException, ServerException;
}
