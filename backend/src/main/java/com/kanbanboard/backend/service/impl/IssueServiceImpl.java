package com.kanbanboard.backend.service.impl;

import com.kanbanboard.backend.dto.IssueDto;
import com.kanbanboard.backend.dto.WorkLogCreationDto;
import com.kanbanboard.backend.model.Issue;
import com.kanbanboard.backend.model.Project;
import com.kanbanboard.backend.model.WorkLog;
import com.kanbanboard.backend.repository.IssueRepository;
import com.kanbanboard.backend.repository.WorkLogRepository;
import com.kanbanboard.backend.service.IssueService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class IssueServiceImpl implements IssueService {

    private final ModelMapper modelMapper;

    private final IssueRepository issueRepository;

    private final WorkLogRepository workLogRepository;

    @Autowired
    IssueServiceImpl(ModelMapper modelMapper, IssueRepository issueRepository, WorkLogRepository workLogRepository) {
        this.modelMapper = modelMapper;

        this.issueRepository = issueRepository;
        this.workLogRepository = workLogRepository;
    }

    @Override
    public void deleteById(String id) {
        issueRepository.deleteById(id);
    }

    @Override
    public IssueDto addWorklog(String id, WorkLogCreationDto workLogCreationDto)
    {
        Issue issue = issueRepository.findById(id).orElse(null);

        if (issue == null)
            return null;

        WorkLog workLog = modelMapper.map(workLogCreationDto, WorkLog.class);

        return null;
    }

    @Override
    public void deleteWorklog(String idIssue, String idWorklog) {

        // TODO: Add exception
        Issue issue = issueRepository.findById(idIssue).orElse(null);

        if (issue == null)
            return;

        WorkLog workLog = workLogRepository.findById(idWorklog).orElse(null);

        if (workLog == null)
            return;

        issue.getWorkLogs().remove(workLog);

        workLogRepository.delete(workLog);

        issueRepository.save(issue);
    }
}
