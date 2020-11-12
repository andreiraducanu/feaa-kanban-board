package com.kanbanboard.backend.model;

import com.kanbanboard.backend.model.enums.IssuePriority;
import com.kanbanboard.backend.model.enums.IssueType;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@TypeAlias("issue")
@Document(collection = "issues")
public class Issue {

    @Id
    private String id;

    private String title;

    private String description;

    private IssueType type;

    private IssuePriority priority;

    private User reporter;

    private User assignee;

    private Issue epic;

    private List<Issue> children;

    private List<Comment> comments;

    private int totalWorkTime;

    private int currentWorkTime;

    private List<WorkLog> workLogs;

    private Date creationDate;
}
