package com.kanbanboard.backend.model;

import com.kanbanboard.backend.model.enums.IssuePriority;
import com.kanbanboard.backend.model.enums.IssueType;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
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

    private List<Issue> children;

    private int totalWorkTime;

    private int currentWorkTime;

    private List<WorkLog> workLogs;

    private List<Comment> comments;

    private Date creationDate;

    public void update(Issue issue) {
        title = issue.getTitle();
        description = issue.getDescription();
        type = issue.getType();
        priority = issue.getPriority();

        reporter = issue.getReporter();
        assignee = issue.getAssignee();

        totalWorkTime = issue.getTotalWorkTime();
    }

    public boolean addChild(Issue childIssue) {
        if (children == null)
            children = new ArrayList<>();

        if (containsChild(childIssue))
            return false;

        children.add(childIssue);
        return true;
    }

    public boolean removeChild(Issue childIssue){
        if (children == null)
            return false;

        if (!containsChild(childIssue))
            return false;

        return children.remove(childIssue);
    }

    public boolean containsChild(Issue childIssue){
        if (children == null)
            return false;

        return children.contains(childIssue);
    }

    public boolean addWorkLog(WorkLog workLog) {
        if (workLogs == null)
            workLogs = new ArrayList<>();

        if (containsWorkLog(workLog))
            return false;

        if (currentWorkTime + workLog.getTime() > totalWorkTime)
            return false;

        currentWorkTime += workLog.getTime();

        workLogs.add(workLog);

        return true;
    }

    public boolean removeWorkLog(WorkLog workLog) {
        if (workLogs == null)
            return false;

        if (!containsWorkLog(workLog))
            return false;

        currentWorkTime -= workLog.getTime();
        workLogs.remove(workLog);

        return true;
    }

    public boolean containsWorkLog(WorkLog workLog){
        if (workLogs == null)
            return false;

        return workLogs.contains(workLog);
    }

    public boolean addComment(Comment comment) {
        if (comments == null)
            comments = new ArrayList<>();

        if (containsComment(comment))
            return false;

        comments.add(comment);
        return true;
    }

    public boolean removeComment(Comment comment) {
        if (comments == null)
            return false;

        if (!containsComment(comment))
            return false;

        return comments.remove(comment);
    }

    public boolean containsComment(Comment comment){
        if (comments == null)
            return false;

        return comments.contains(comment);
    }
}
