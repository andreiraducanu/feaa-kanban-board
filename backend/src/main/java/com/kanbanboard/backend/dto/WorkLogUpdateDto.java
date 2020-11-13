package com.kanbanboard.backend.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.PositiveOrZero;

@Getter
@Setter
public class WorkLogUpdateDto {

    @PositiveOrZero
    private int time;
}
