package com.kanbanboard.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class WorkLogDto {

    private String id;

    private UserDto user;

    private int time;

    private Date creationDate;
}
