package com.kanbanboard.backend.dto;

import com.kanbanboard.backend.model.enums.IssuePriority;
import com.kanbanboard.backend.model.enums.IssueType;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class IssueDto {

    private String id;

    private String title;

    private String description;

    private IssueType type;

    private IssuePriority priority;

    private IssueDto epic;

    private IssueDto parent;

    private List<IssueDto> children;

    private UserDto reporter;

    private UserDto assignee;

    private List<CommentDto> comments;

    private int totalWorkTime;

    private int currentWorkTime;

    private List<WorkLogDto> workLogs;

    private Date creationDate;
}