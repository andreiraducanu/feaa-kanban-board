package com.kanbanboard.backend.service.impl;

import com.kanbanboard.backend.dto.IssueDto;
import com.kanbanboard.backend.dto.WorkLogCreationDto;
import com.kanbanboard.backend.dto.WorkLogUpdateDto;
import com.kanbanboard.backend.model.Issue;
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
    public IssueDto addWorkLog(String id, WorkLogCreationDto workLogCreationDto)
    {
        Issue issue = issueRepository.findById(id).orElse(null);

        if (issue == null)
            return null;

        WorkLog workLog = modelMapper.map(workLogCreationDto, WorkLog.class);

        issue.addWorklog(workLog);

        issue = issueRepository.save(issue);

        return convertToDto(issue);
    }

    @Override
    public IssueDto updateWorkLog(String id, WorkLogUpdateDto workLogUpdateDto)
    {
        Issue issue = issueRepository.findById(id).orElse(null);

        if (issue == null)
            return null;

        WorkLog workLog = modelMapper.map(workLogUpdateDto, WorkLog.class);

        issue.updateWorkLog(workLog);

        issue = issueRepository.save(issue);

        return convertToDto(issue);
    }

    @Override
    public void deleteWorkLog(String idIssue, String idWorklog) {

        // TODO: Add exception
        Issue issue = issueRepository.findById(idIssue).orElse(null);

        if (issue == null)
            return;

        WorkLog workLog = workLogRepository.findById(idWorklog).orElse(null);

        if (workLog == null)
            return;

        issue.removeWorkLog(workLog);

        workLogRepository.delete(workLog);

        issueRepository.save(issue);
    }

    private IssueDto convertToDto(Issue issue) {
        return modelMapper.map(issue, IssueDto.class);
    }
}
