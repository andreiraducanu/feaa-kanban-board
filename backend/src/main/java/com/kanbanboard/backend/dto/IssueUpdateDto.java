package com.kanbanboard.backend.dto;

import com.kanbanboard.backend.model.enums.IssuePriority;
import com.kanbanboard.backend.model.enums.IssueType;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
public class IssueUpdateDto {

    @NotEmpty
    private String title;

    @NotEmpty
    private IssueType type;

    @NotEmpty
    private IssuePriority priority;

    @NotEmpty
    private String assigneeUsername;
}
