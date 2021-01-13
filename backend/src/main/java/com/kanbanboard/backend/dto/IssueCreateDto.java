package com.kanbanboard.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kanbanboard.backend.model.enums.IssuePriority;
import com.kanbanboard.backend.model.enums.IssueType;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Calendar;
import java.util.Date;

@Getter
@Setter
public class IssueCreateDto {

    @NotEmpty
    private String projectId;

    @NotEmpty
    private String title;

//    @NotNull
    @JsonIgnore
    private IssueType type;

//    @NotNull
    @JsonIgnore
    private IssuePriority priority;

//    @NotNull
    @JsonIgnore
    private String assigneeUsername;

    @JsonIgnore
    private Date creationDate = Calendar.getInstance().getTime();
}
