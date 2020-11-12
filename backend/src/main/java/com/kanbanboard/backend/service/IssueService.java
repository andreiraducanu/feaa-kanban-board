package com.kanbanboard.backend.service;

import com.kanbanboard.backend.dto.IssueDto;
import com.kanbanboard.backend.dto.ProjectDto;
import com.kanbanboard.backend.dto.WorkLogCreationDto;
import com.kanbanboard.backend.dto.WorkLogUpdateDto;
import com.kanbanboard.backend.model.Issue;
import com.kanbanboard.backend.model.Project;

public interface IssueService {

    void deleteById(String id);

    IssueDto addWorkLog(String id, WorkLogCreationDto workLogCreationDto);

    IssueDto updateWorkLog(String id, WorkLogUpdateDto workLogUpdateDto);

    public void deleteWorkLog(String idIssue, String idWorklog);
}
