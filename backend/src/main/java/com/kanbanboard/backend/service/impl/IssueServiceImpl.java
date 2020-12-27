package com.kanbanboard.backend.service.impl;

import com.kanbanboard.backend.dto.*;
import com.kanbanboard.backend.exception.EntityNotFoundException;
import com.kanbanboard.backend.exception.ServerException;
import com.kanbanboard.backend.model.*;
import com.kanbanboard.backend.repository.*;
import com.kanbanboard.backend.service.IssueService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IssueServiceImpl implements IssueService {

    private final ModelMapper modelMapper;

    private final ProjectRepository projectRepository;
    private final ColumnRepository columnRepository;
    private final IssueRepository issueRepository;
    private final WorkLogRepository workLogRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    @Autowired
    public IssueServiceImpl(ModelMapper modelMapper, ProjectRepository projectRepository, ColumnRepository columnRepository, IssueRepository issueRepository, WorkLogRepository workLogRepository, CommentRepository commentRepository, UserRepository userRepository) {
        this.modelMapper = modelMapper;
        this.projectRepository = projectRepository;
        this.columnRepository = columnRepository;
        this.issueRepository = issueRepository;
        this.workLogRepository = workLogRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }

    @Override
    public IssueDto create(IssueCreateDto issueCreateDto) throws EntityNotFoundException, ServerException {
        // Get the project
        Project project = findProjectById(issueCreateDto.getProjectId());
        if (project == null)
            throw new EntityNotFoundException("No project found");

        User reporter = null;
        if (issueCreateDto.getReporterUsername() != null) {
            // Get the reporter
            reporter = userRepository.findByUsername(issueCreateDto.getReporterUsername());
            if (reporter == null)
                throw new EntityNotFoundException("No such reporter");
        }

        User assignee = null;
        if (issueCreateDto.getAssigneeUsername() != null) {
            // Get the assignee
            assignee = userRepository.findByUsername(issueCreateDto.getAssigneeUsername());
            if (assignee == null)
                throw new EntityNotFoundException("No such assignee");
        }

        // Convert DTO to model
        Issue issue = modelMapper.map(issueCreateDto, Issue.class);

        issue.setReporter(reporter);
        issue.setAssignee(assignee);

        // Save the issue
        issue = saveOrUpdateIssue(issue);

        // Add the issue to project
        Column backlogColumn = project.getColumns().get(0);

        if (!backlogColumn.addIssue(issue))
            throw new ServerException("It looks something went wrong in creating this issue! Please try again later");

        // Save the column
        saveOrUpdateColumn(backlogColumn);

        return convertIssueToDto(issue);
    }

    @Override
    public IssueDto getById(String idIssue) throws EntityNotFoundException {
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            throw new EntityNotFoundException("No issue found");

        return convertIssueToDto(issue);
    }

    @Override
    public IssueDto updateById(String idIssue, IssueUpdateDto issueUpdateDto) throws EntityNotFoundException {
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            throw new EntityNotFoundException("No issue found");

        // Convert the DTO to model
        Issue issueUpdate = modelMapper.map(issueUpdateDto, Issue.class);

        // Update the issue
        issue.update(issueUpdate);
        issue = saveOrUpdateIssue(issue);

        return convertIssueToDto(issue);
    }

    @Override
    public String deleteById(String idIssue) throws EntityNotFoundException {
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            throw new EntityNotFoundException("No issue found");

        // Delete issue
        issueRepository.delete(issue);

        return "ok";
    }

    @Override
    public IssueDto addChild(String idIssue, IssueAddChildDto issueAddChildDto) throws EntityNotFoundException, ServerException {
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            throw new EntityNotFoundException("No issue found");

        // Get the child issue
        Issue childIssue = findIssueById(issueAddChildDto.getChildId());
        if (childIssue == null)
            throw new EntityNotFoundException("No child issue found");

        // Add the child to issue
        if (!issue.addChild(childIssue))
            throw new ServerException("It looks something went wrong in adding this issue! Please try again later");

        // Update the project
        issue = saveOrUpdateIssue(issue);

        return convertIssueToDto(issue);
    }

    @Override
    public IssueDto removeChild(String idIssue, IssueRemoveChildDto issueRemoveChildDto) throws EntityNotFoundException, ServerException {
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            throw new EntityNotFoundException("No issue found");

        // Get the child issue
        Issue childIssue = findIssueById(issueRemoveChildDto.getChildId());
        if (childIssue == null)
            throw new EntityNotFoundException("No child issue found");

        // Remove the child from issue
        if (!issue.removeChild(childIssue))
            throw new ServerException("It looks something went wrong in removing this child! Please try again later");

        // Update the project
        issue = saveOrUpdateIssue(issue);

        return convertIssueToDto(issue);
    }

    @Override
    public WorkLogDto addWorkLog(String idIssue, WorkLogCreateDto workLogCreateDto) throws EntityNotFoundException, ServerException {
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            throw new EntityNotFoundException("No issue found");

        // Get the user, for testing purpose
        User user = userRepository.findByUsername(workLogCreateDto.getUserUsername());
        if (user == null)
            throw new EntityNotFoundException("No user found");

        // Convert DTO to model
        WorkLog workLog = modelMapper.map(workLogCreateDto, WorkLog.class);

        // Set the user
        workLog.setUser(user);

        // Save the model
        workLog = saveOrUpdateWorkLog(workLog);

        // Add the work log to issue
        if (!issue.addWorkLog(workLog)) {
            workLogRepository.delete(workLog);
            throw new ServerException("It looks something went wrong in adding this work log! Please try again later");
        }

        // Update the issue
        saveOrUpdateIssue(issue);

        return convertWorkLogToDto(workLog);
    }

    @Override
    public WorkLogDto updateWorkLog(String idIssue, String idWorkLog, WorkLogUpdateDto workLogUpdateDto) throws EntityNotFoundException, ServerException {
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            throw new EntityNotFoundException("No issue found");

        // Get the work log
        WorkLog workLog = findWorkLogById(idWorkLog);
        if (workLog == null)
            throw new EntityNotFoundException("No work log found");

        // Check if issue has this work log
        if (!issue.containsWorkLog(workLog))
            throw new ServerException("Some problems with database and server");

        // Convert DTO to model
        WorkLog workLogUpdate = modelMapper.map(workLogUpdateDto, WorkLog.class);

        // Update the work log
        workLog.update(workLogUpdate);
        workLog = saveOrUpdateWorkLog(workLog);

        return convertWorkLogToDto(workLog);
    }

    @Override
    public String deleteWorkLog(String idIssue, String idWorkLog) throws EntityNotFoundException, ServerException {
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            throw new EntityNotFoundException("No issue found");

        // Get the work log
        WorkLog workLog = findWorkLogById(idWorkLog);
        if (workLog == null)
            throw new EntityNotFoundException("No work log found");

        if (!issue.removeWorkLog(workLog))
            throw new ServerException("Some problems with deleting this work log. Please try again later");

        // Delete the work log
        workLogRepository.delete(workLog);

        // Update the issue
        saveOrUpdateIssue(issue);

        return "ok";
    }

    @Override
    public CommentDto addComment(String idIssue, CommentCreateDto commentCreateDto) throws EntityNotFoundException, ServerException {
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            throw new EntityNotFoundException("No issue found");

        // Get the user, for testing purpose
        User user = userRepository.findByUsername(commentCreateDto.getUserUsername());
        if (user == null)
            throw new EntityNotFoundException("No user found");

        // Convert DTO to model
        Comment comment = modelMapper.map(commentCreateDto, Comment.class);

        // Set the user
        comment.setUser(user);

        // Save the model
        comment = saveOrUpdateComment(comment);

        // Add the comment to issue
        if (!issue.addComment(comment)) {
            commentRepository.delete(comment);
            throw new ServerException("Some problems with adding this issue");
        }

        // Update the issue
        saveOrUpdateIssue(issue);

        return convertCommentToDto(comment);
    }

    @Override
    public CommentDto updateComment(String idIssue, String idComment, CommentUpdateDto commentUpdateDto) throws EntityNotFoundException, ServerException {
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            throw new EntityNotFoundException("No issue found");

        // Get the comment
        Comment comment = findCommentById(idComment);
        if (comment == null)
            throw new EntityNotFoundException("No comment found");

        // Check if issue has this comment
        if (!issue.containsComment(comment))
            throw new ServerException("Some problems with adding this comment");

        // Convert the DTO to model
        Comment commentUpdate = modelMapper.map(commentUpdateDto, Comment.class);

        // Update the comment
        comment.update(commentUpdate);
        comment = saveOrUpdateComment(comment);

        return convertCommentToDto(comment);
    }

    @Override
    public String deleteComment(String idIssue, String idComment) throws EntityNotFoundException, ServerException {
        // Get the issue
        Issue issue = findIssueById(idIssue);
        if (issue == null)
            throw new EntityNotFoundException("No issue found");

        // Get the comment
        Comment comment = findCommentById(idComment);
        if (comment == null)
            throw new EntityNotFoundException("No comment found");

        if (!issue.removeComment(comment))
            throw new ServerException("Some problems with removing this comment");

        // Delete the comment
        commentRepository.delete(comment);

        // Update the issue
        saveOrUpdateIssue(issue);

        return "ok";
    }

    private Column saveOrUpdateColumn(Column column) {
        return columnRepository.save(column);
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

    private Project findProjectById(String id) {
        return projectRepository.findById(id).orElse(null);
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
