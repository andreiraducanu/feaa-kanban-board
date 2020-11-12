package com.kanbanboard.backend.dto;

import com.kanbanboard.backend.model.Issue;
import com.kanbanboard.backend.model.enums.IssuePriority;
import com.kanbanboard.backend.model.enums.IssueType;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

@Getter
@Setter
public class IssueUpdateDto {

    @NotEmpty
    private String title;

    @NotNull
    private String description;

    @NotEmpty
    private IssueType type;

    @NotEmpty
    private IssuePriority priority;

    @NotEmpty
    private Issue epicId;

    @NotEmpty
    private Issue parentId;

    @NotEmpty
    private String reporterUsername;

    @NotEmpty
    private String assigneeUsername;

    @PositiveOrZero
    private int totalWorkTime;
}
