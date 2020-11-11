package com.kanbanboard.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kanbanboard.backend.model.User;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
public class ProjectAddMemberDto {

    @NotEmpty
    private String memberId;
}
