package com.kanbanboard.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kanbanboard.backend.model.enums.IssuePriority;
import com.kanbanboard.backend.model.enums.IssueType;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.util.Calendar;
import java.util.Date;

@Getter
@Setter
public class IssueCreateDto {

    @NotEmpty
    private String projectId;

    @NotEmpty
    private String title;

    @NotEmpty
    private String description;

    @NotNull
    private IssueType type;

    @NotNull
    private IssuePriority priority;

    private String reporterUsername;

    private String assigneeUsername;

    @PositiveOrZero
    private int totalWorkTime;

    @JsonIgnore
    private Date creationDate = Calendar.getInstance().getTime();
}
