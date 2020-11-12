package com.kanbanboard.backend.service;

import com.kanbanboard.backend.dto.CommentDto;
import com.kanbanboard.backend.dto.IssueDto;
import com.kanbanboard.backend.dto.ProjectDto;
import com.kanbanboard.backend.dto.WorkLogCreationDto;
import com.kanbanboard.backend.dto.WorkLogUpdateDto;
import com.kanbanboard.backend.model.Issue;
import com.kanbanboard.backend.model.Project;

public interface IssueService {

    void deleteById(String id);

    IssueDto addWorkLog(String id, WorkLogCreationDto workLogCreationDto);

    IssueDto addComment(CommentDto commentDto, String id);

    IssueDto changeComment(CommentDto commentDto, String idIssue, String idComment);

    String deleteComment(String idIssue, String idComment);

    IssueDto addChild(String id, IssueDto issueDto);

    IssueDto updateWorkLog(String id, WorkLogUpdateDto workLogUpdateDto);

    public void deleteWorkLog(String idIssue, String idWorklog);
}
