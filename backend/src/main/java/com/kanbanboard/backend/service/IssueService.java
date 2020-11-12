package com.kanbanboard.backend.service;

import com.kanbanboard.backend.dto.CommentDto;
import com.kanbanboard.backend.dto.IssueDto;
import com.kanbanboard.backend.dto.WorkLogCreationDto;

public interface IssueService {

    void deleteById(String id);

    IssueDto addWorklog(String id, WorkLogCreationDto workLogCreationDto);

    void deleteWorklog(String idIssue, String idWorklog);

    IssueDto addComment(CommentDto commentDto, String id);

    IssueDto changeComment(CommentDto commentDto, String idIssue, String idComment);

    String deleteComment(String idIssue, String idComment);

    IssueDto addChild(String id, IssueDto issueDto);

}
