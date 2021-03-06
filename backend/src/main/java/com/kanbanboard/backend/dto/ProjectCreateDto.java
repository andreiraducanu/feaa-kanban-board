package com.kanbanboard.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import java.util.Calendar;
import java.util.Date;

@Getter
@Setter
public class ProjectCreateDto {

    @NotEmpty
    private String name;

    @NotEmpty
    private String description;

    @NotEmpty
    private String ownerUsername;

    @JsonIgnore
    private Date creationDate = Calendar.getInstance().getTime();
}
