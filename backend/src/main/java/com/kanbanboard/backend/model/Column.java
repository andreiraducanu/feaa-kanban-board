package com.kanbanboard.backend.model;

import com.kanbanboard.backend.model.base.AbstractDocument;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document("columns")
public class Column extends AbstractDocument {

    private String name;

    @DBRef
    private final List<Issue> issues;

    Column(String name, List<Issue> issues) {
        this.name = name;
        this.issues = issues;
    }

    @PersistenceConstructor
    public Column(String name) {
        this(name, new ArrayList<>());
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Issue> getIssues() {
        return issues;
    }

    public void addIssue(Issue issue) {
        if (!issues.contains(issue))
            issues.add(issue);
    }

    public void removeIssue(Issue issue) {
        issues.remove(issue);
    }
}
