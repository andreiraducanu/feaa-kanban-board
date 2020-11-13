package com.kanbanboard.backend.service.impl;

import com.kanbanboard.backend.dto.*;
import com.kanbanboard.backend.model.Comment;
import com.kanbanboard.backend.model.Issue;
import com.kanbanboard.backend.model.User;
import com.kanbanboard.backend.model.WorkLog;
import com.kanbanboard.backend.repository.CommentRepository;
import com.kanbanboard.backend.repository.IssueRepository;
import com.kanbanboard.backend.repository.UserRepository;
import com.kanbanboard.backend.repository.WorkLogRepository;
import com.kanbanboard.backend.service.IssueService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IssueServiceImpl implements IssueService {

    private final ModelMapper modelMapper;

    private final IssueRepository issueRepository;
    private final WorkLogRepository workLogRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    @Autowired
    IssueServiceImpl(ModelMapper modelMapper, IssueRepository issueRepository, WorkLogRepository workLogRepository, CommentRepository commentRepository, UserRepository userRepository) {
        this.modelMapper = modelMapper;

        this.issueRepository = issueRepository;
        this.workLogRepository = workLogRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }

    @Override
    public IssueDto create(IssueCreateDto issueCreateDto) {
        return null;
    }

    @Override
    public IssueDto getById(String idIssue) {
        // TODO: Add exception
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            return null;

        return convertIssueToDto(issue);
    }

    @Override
    public IssueDto updateById(String idIssue, IssueUpdateDto issueUpdateDto) {
        // TODO: Add exception
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            return null;

        // Convert the DTO to model
        Issue issueUpdate = modelMapper.map(issueUpdateDto, Issue.class);

        // Update the issue
        issue.update(issueUpdate);
        issue = saveOrUpdateIssue(issue);

        return convertIssueToDto(issue);
    }

    @Override
    public String deleteById(String idIssue) {
        // TODO: Add exception
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            return null;

        // Delete issue
        issueRepository.delete(issue);

        return "ok";
    }

    @Override
    public IssueDto addChild(String idIssue, IssueAddChildDto issueAddChildDto) {
        // TODO: Add exception
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            return null;

        // TODO: Add exception
        // Get the child issue
        Issue childIssue = findIssueById(issueAddChildDto.getChildId());
        if (childIssue == null)
            return null;

        // TODO: Add exception
        // Add the child to issue
        if (!issue.addChild(childIssue))
            return null;

        // Update the project
        issue = saveOrUpdateIssue(issue);

        return convertIssueToDto(issue);
    }

    @Override
    public IssueDto removeChild(String idIssue, IssueRemoveChildDto issueRemoveChildDto) {
        // TODO: Add exception
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            return null;

        // TODO: Add exception
        // Get the child issue
        Issue childIssue = findIssueById(issueRemoveChildDto.getChildId());
        if (childIssue == null)
            return null;

        // TODO: Add exception
        // Remove the child from issue
        if (!issue.removeChild(childIssue))
            return null;

        // Update the project
        issue = saveOrUpdateIssue(issue);

        return convertIssueToDto(issue);
    }

    @Override
    public WorkLogDto addWorkLog(String idIssue, WorkLogCreateDto workLogCreateDto) {
        // TODO: Add exception
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            return null;

        // TODO: Add exception
        // Get the user
        User user = userRepository.findByUsername(workLogCreateDto.getUserUsername());
        if (user == null)
            return null;

        // Convert DTO to model
        WorkLog workLog = modelMapper.map(workLogCreateDto, WorkLog.class);

        // Set the user
        workLog.setUser(user);

        // Save the model
        workLog = saveOrUpdateWorkLog(workLog);

        // TODO: Add exception
        // Add the work log to issue
        if (!issue.addWorkLog(workLog)) {
            workLogRepository.delete(workLog);
            return null;
        }

        // Update the issue
        saveOrUpdateIssue(issue);

        return convertWorkLogToDto(workLog);
    }

    @Override
    public WorkLogDto updateWorkLog(String idIssue, String idWorkLog, WorkLogUpdateDto workLogUpdateDto) {
        // TODO: Add exception
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            return null;

        // TODO: Add exception
        // Get the work log
        WorkLog workLog = findWorkLogById(idWorkLog);
        if (workLog == null)
            return null;

        // TODO: Add Exception
        // Check if issue has this work log
        if (!issue.containsWorkLog(workLog))
            return null;

        // Convert DTO to model
        WorkLog workLogUpdate = modelMapper.map(workLogUpdateDto, WorkLog.class);

        // Update the work log
        workLog.update(workLogUpdate);
        workLog = saveOrUpdateWorkLog(workLog);

        return convertWorkLogToDto(workLog);
    }

    @Override
    public String deleteWorkLog(String idIssue, String idWorkLog) {
        // TODO: Add exception
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            return null;

        // TODO: Add exception
        // Get the work log
        WorkLog workLog = findWorkLogById(idWorkLog);
        if (workLog == null)
            return null;

        // TODO: Add exception
        if (!issue.removeWorkLog(workLog))
            return null;

        // Delete the work log
        workLogRepository.delete(workLog);

        // Update the issue
        saveOrUpdateIssue(issue);

        return "ok";
    }

    @Override
    public CommentDto addComment(String idIssue, CommentCreateDto commentCreateDto) {
        // TODO: Add exception
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            return null;

        // TODO: Add exception
        // Get the user
        User user = userRepository.findByUsername(commentCreateDto.getUserUsername());
        if (user == null)
            return null;

        // Convert DTO to model
        Comment comment = modelMapper.map(commentCreateDto, Comment.class);

        // Set the user
        comment.setUser(user);

        // Save the model
        comment = saveOrUpdateComment(comment);

        // TODO: Add exception
        // Add the comment to issue
        if (!issue.addComment(comment)) {
            commentRepository.delete(comment);
            return null;
        }

        // Update the issue
        saveOrUpdateIssue(issue);

        return convertCommentToDto(comment);
    }

    @Override
    public CommentDto updateComment(String idIssue, String idComment, CommentUpdateDto commentUpdateDto) {
        // TODO: Add exception
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            return null;

        // TODO: Add exception
        // Get the comment
        Comment comment = findCommentById(idComment);
        if (comment == null)
            return null;

        // TODO: Add Exception
        // Check if issue has this comment
        if (!issue.containsComment(comment))
            return null;

        // Convert the DTO to model
        Comment commentUpdate = modelMapper.map(commentUpdateDto, Comment.class);

        // Update the comment
        comment.update(commentUpdate);
        comment = saveOrUpdateComment(comment);

        return convertCommentToDto(comment);
    }

    @Override
    public String deleteComment(String idIssue, String idComment) {
        // TODO: Add exception
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            return null;

        // TODO: Add exception
        // Get the comment
        Comment comment = findCommentById(idComment);
        if (comment == null)
            return null;

        // TODO: Add exception
        if (!issue.removeComment(comment))
            return null;

        // Delete the comment
        commentRepository.delete(comment);

        // Update the issue
        saveOrUpdateIssue(issue);

        return "ok";
    }

    private Issue saveOrUpdateIssue(Issue issue) {
        return issueRepository.save(issue);
    }

    private WorkLog saveOrUpdateWorkLog(WorkLog workLog) {
        return workLogRepository.save(workLog);
    }

    private Comment saveOrUpdateComment(Comment comment) {
        return commentRepository.save(comment);
    }

    private Issue findIssueById(String id) {
        return issueRepository.findById(id).orElse(null);
    }

    private WorkLog findWorkLogById(String id) {
        return workLogRepository.findById(id).orElse(null);
    }

    private Comment findCommentById(String id) {
        return commentRepository.findById(id).orElse(null);
    }

    private IssueDto convertIssueToDto(Issue issue) {
        return modelMapper.map(issue, IssueDto.class);
    }

    private WorkLogDto convertWorkLogToDto(WorkLog workLog) {
        return modelMapper.map(workLog, WorkLogDto.class);
    }

    private CommentDto convertCommentToDto(Comment comment) {
        return modelMapper.map(comment, CommentDto.class);
    }

}
