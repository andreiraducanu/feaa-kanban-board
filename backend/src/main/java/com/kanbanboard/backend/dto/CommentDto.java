package com.kanbanboard.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CommentDto {

    private String id;

    private UserDto user;

    private String text;

    private Date creationDate;
}
