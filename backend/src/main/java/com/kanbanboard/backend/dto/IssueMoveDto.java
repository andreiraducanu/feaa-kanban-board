package com.kanbanboard.backend.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.PositiveOrZero;

@Getter
@Setter
public class IssueMoveDto {

    @NotEmpty
    private String sourceColumnId;

    @NotEmpty
    private String destinationColumnId;

    @PositiveOrZero
    private int destinationIndex;
}
