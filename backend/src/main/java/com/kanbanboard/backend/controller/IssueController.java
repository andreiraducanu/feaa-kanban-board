package com.kanbanboard.backend.controller;

import com.kanbanboard.backend.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;

public class IssueController {
    private final IssueService issueService;

    @Autowired
    IssueController(IssueService issueService) {
        this.issueService = issueService;
    }
}