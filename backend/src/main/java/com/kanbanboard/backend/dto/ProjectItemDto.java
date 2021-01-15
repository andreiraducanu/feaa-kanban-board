package com.kanbanboard.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectItemDto {

    String id;

    String name;

    String description;

    UserDto owner;
}
