package com.kanbanboard.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginDto {

    private final String jwt;

    private final UserDto user;
}
