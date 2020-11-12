package com.kanbanboard.backend.service.impl;

import com.kanbanboard.backend.dto.CommentDto;
import com.kanbanboard.backend.dto.IssueDto;
import com.kanbanboard.backend.dto.WorkLogCreationDto;
import com.kanbanboard.backend.model.Comment;
import com.kanbanboard.backend.model.Issue;
import com.kanbanboard.backend.model.Project;
import com.kanbanboard.backend.model.WorkLog;
import com.kanbanboard.backend.repository.IssueRepository;
import com.kanbanboard.backend.repository.WorkLogRepository;
import com.kanbanboard.backend.service.IssueService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

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
    public IssueDto addWorklog(String id, WorkLogCreationDto workLogCreationDto) {
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

    @Override
    public IssueDto addComment(CommentDto commentDto, String id) {
        Issue issue = issueRepository.findById(id).orElse(null);
        issue.addComent(modelMapper.map(commentDto, Comment.class));

        issueRepository.save(issue);
        return modelMapper.map(issue, IssueDto.class);
    }

    @Override
    public IssueDto changeComment(CommentDto commentDto, String idIssue, String idComment) {
        Issue issue = issueRepository.findById(idIssue).orElse(null);
        for (int i = 0; i < issue.getComments().size(); i++) {
            if (issue.getComments().get(i).getId().equals(idComment)) {
                issue.getComments().set(i, modelMapper.map(commentDto, Comment.class));
                break;
            }
        }

        issueRepository.save(issue);
        return modelMapper.map(issue, IssueDto.class);
    }

    @Override
    public String deleteComment(String idIssue, String idComment) {
        Boolean found = false;
        Issue issue = issueRepository.findById(idIssue).orElse(null);
        for (int i = 0; i < issue.getComments().size(); i++) {
            if (issue.getComments().get(i).getId().equals(idComment)) {
                issue.getComments().remove(i);
                found = true;
                break;
            }
        }

        issueRepository.save(issue);
        return found.toString();
    }

    @Override
    public IssueDto addChild(String id, IssueDto issueDto) {
        Issue issue = issueRepository.findById(id).orElse(null);
        issue.addChild(modelMapper.map(issueDto, Issue.class));

        this.issueRepository.save(issue);
        return modelMapper.map(issue, IssueDto.class);

    }
}
