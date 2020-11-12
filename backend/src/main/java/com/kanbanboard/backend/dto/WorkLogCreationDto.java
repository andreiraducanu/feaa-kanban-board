package com.kanbanboard.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.PositiveOrZero;
import java.util.Calendar;
import java.util.Date;

@Getter
@Setter
public class WorkLogCreationDto {

    @NotEmpty
    private String userUsername;

    @PositiveOrZero
    private int time;

    @JsonIgnore
    private Date creationDate = Calendar.getInstance().getTime();
}
