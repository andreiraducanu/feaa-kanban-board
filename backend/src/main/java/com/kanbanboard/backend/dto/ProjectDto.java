package com.kanbanboard.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProjectDto {

    private String id;

    private String name;

    private String description;

    private UserDto owner;

    private List<UserDto> members;

    private List<ColumnDto> columns;
}
