package com.kanbanboard.backend.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
public class UserLoginDto {

    @NotEmpty
    private String username;

    @NotEmpty
    private String password;
}
