package com.kanbanboard.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProjectDto {

    String id;

    String name;

    String description;

    UserDto owner;

    List<UserDto> members;
}
