package com.kanbanboard.backend.model;

import com.kanbanboard.backend.model.enums.IssuePriority;
import com.kanbanboard.backend.model.enums.IssueType;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "issues")
public class Issue {

    @Id
    private String id;

    private String title;

    private String description;

    private IssueType type;

    private IssuePriority priority;

    private Project project;

    private User reporter;

    private User assignee;

    private Issue epic;

    private Issue parent;

    @DBRef
    private List<Issue> children;

    @DBRef
    private List<Comment> comments;

    private int timeEstimate;

    private int timeTracking;

    @DBRef
    private List<WorkLog> workLogs;

    private Date creationDate;
}
