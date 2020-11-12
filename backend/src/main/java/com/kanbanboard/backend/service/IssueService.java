package com.kanbanboard.backend.service;

import com.kanbanboard.backend.dto.IssueDto;
import com.kanbanboard.backend.dto.WorkLogCreationDto;

public interface IssueService {

    void deleteById(String id);

    IssueDto addWorklog(String id, WorkLogCreationDto workLogCreationDto);

    public void deleteWorklog(String idIssue, String idWorklog);
}
