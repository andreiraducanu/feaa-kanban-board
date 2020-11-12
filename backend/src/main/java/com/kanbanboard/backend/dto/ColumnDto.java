package com.kanbanboard.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ColumnDto {

    private String id;

    private String name;

    private List<IssueDto> isssue;
}
