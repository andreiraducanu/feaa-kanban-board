package com.kanbanboard.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JwtDto {

    private final String jwt;

    private String message;

    private String status;

}
