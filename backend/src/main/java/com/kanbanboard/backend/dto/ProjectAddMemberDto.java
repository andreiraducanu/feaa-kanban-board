package com.kanbanboard.backend.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
public class ProjectAddMemberDto {

    @NotEmpty
    private String username;
}
