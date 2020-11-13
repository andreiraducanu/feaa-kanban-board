package com.kanbanboard.backend.dto;

import com.kanbanboard.backend.model.enums.IssuePriority;
import com.kanbanboard.backend.model.enums.IssueType;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.PositiveOrZero;

@Getter
@Setter
public class IssueUpdateDto {

    @NotEmpty
    private String title;

    private String description;

    @NotEmpty
    private IssueType type;

    @NotEmpty
    private IssuePriority priority;

    private String reporterUsername;

    private String assigneeUsername;

    @PositiveOrZero
    private int totalWorkTime;
}
