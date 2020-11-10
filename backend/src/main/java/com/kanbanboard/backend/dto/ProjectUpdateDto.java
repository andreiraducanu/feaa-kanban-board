package com.kanbanboard.backend.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
public class ProjectUpdateDto {

    @NotEmpty
    private String name;

    @NotEmpty
    private String description;
}
