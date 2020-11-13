package com.kanbanboard.backend.service;

import com.kanbanboard.backend.dto.*;
import com.kanbanboard.backend.model.WorkLog;

public interface IssueService {

    IssueDto create(IssueCreateDto issueCreateDto);

    IssueDto getById(String idIssue);

    IssueDto updateById(String idIssue, IssueUpdateDto issueUpdateDto);

    String deleteById(String idIssue);

    IssueDto addChild(String idIssue, IssueAddChildDto issueAddChildDto);

    IssueDto removeChild(String idIssue, IssueRemoveChildDto issueRemoveChildDto);

    WorkLogDto addWorkLog(String idIssue, WorkLogCreateDto workLogCreateDto);

    WorkLogDto updateWorkLog(String idIssue, String idWorkLog, WorkLogUpdateDto workLogUpdateDto);

    String deleteWorkLog(String idIssue, String idWorkLog);

    CommentDto addComment(String idIssue, CommentCreateDto commentCreateDto);

    CommentDto updateComment(String idIssue, String idComment, CommentUpdateDto commentDto);

    String deleteComment(String idIssue, String idComment);
}
