package com.kanbanboard.backend.dto;

import com.kanbanboard.backend.model.Comment;
import com.kanbanboard.backend.model.enums.IssuePriority;
import com.kanbanboard.backend.model.enums.IssueType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class IssueDto {

    private String id;

    private String title;

    private String description;

    private IssueType type;

    private IssuePriority priority;

    private UserDto reporter;

    private UserDto assignee;

    private List<IssueDto> children;

    private List<Comment> comments;
}
