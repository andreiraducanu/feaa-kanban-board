package com.kanbanboard.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@TypeAlias("column")
@Document(collection = "columns")
public class Column {

    @Id
    private String id;

    private String name;

    private List<Issue> issues;

    public Column(String name) {
        this.name = name;
        issues = new ArrayList<>();
    }
}
