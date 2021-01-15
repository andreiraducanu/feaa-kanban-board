package com.kanbanboard.backend.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
public class IssueMoveDto {

    @NotEmpty
    private String projectId;

    @NotEmpty
    private String columnId;

    private int index;
}
