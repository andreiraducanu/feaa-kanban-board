package com.kanbanboard.backend.model;

import com.kanbanboard.backend.model.base.AbstractDocument;
import com.kanbanboard.backend.model.embedded.WorkTracker;
import com.kanbanboard.backend.model.enums.IssuePriority;
import com.kanbanboard.backend.model.enums.IssueType;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Document(collection = "issues")
public class Issue extends AbstractDocument {

    private String title;

    private String description;

    private IssueType type;

    private IssuePriority priority;

    @DBRef
    private User reporter;

    @DBRef
    private User assignee;

    @DBRef
    private final List<Issue> children;

    @DBRef
    private final List<Comment> comments;

    private final WorkTracker workTracker;

    private final Date creationDate;

    @PersistenceConstructor
    Issue(String title, String description, IssueType type, IssuePriority priority, User reporter, User assignee, List<Issue> children, List<Comment> comments, WorkTracker workTracker, Date creationDate) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.priority = priority;
        this.reporter = reporter;
        this.assignee = assignee;
        this.children = children;
        this.comments = comments;
        this.workTracker = workTracker;
        this.creationDate = creationDate;
    }

    public Issue(String title, String description, IssueType type, IssuePriority priority, User reporter, User assignee, int timeEstimate) {
        this(title, description, type, priority, reporter, assignee, new ArrayList<>(), new ArrayList<>(), new WorkTracker(timeEstimate), Calendar.getInstance().getTime());
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public IssueType getType() {
        return type;
    }

    public void setType(IssueType type) {
        this.type = type;
    }

    public IssuePriority getPriority() {
        return priority;
    }

    public void setPriority(IssuePriority priority) {
        this.priority = priority;
    }

    public User getReporter() {
        return reporter;
    }

    public void setReporter(User reporter) {
        this.reporter = reporter;
    }

    public User getAssignee() {
        return assignee;
    }

    public void setAssignee(User assignee) {
        this.assignee = assignee;
    }

    public List<Issue> getChildren() {
        return children;
    }

    public boolean addChild(Issue childIssue) {
        if (children.contains(childIssue))
            return false;

        if (this.type == IssueType.EPIC && !(childIssue.type == IssueType.BUG || childIssue.type == IssueType.TASK || childIssue.type == IssueType.STORY))
            return false;

        if ((this.type == IssueType.BUG || this.type == IssueType.TASK || this.type == IssueType.STORY) && childIssue.type != IssueType.SUBTASK)
            return false;

        children.add(childIssue);
        return true;
    }

    public boolean removeChild(Issue childIssue) {
        return children.remove(childIssue);
    }

    public List<Comment> getComments() {
        return comments;
    }

    public boolean addComment(Comment comment) {
        if (comments.contains(comment))
            return false;

        comments.add(comment);
        return true;
    }

    public boolean removeComment(Comment comment) {
        return comments.remove(comment);
    }

    public WorkTracker getWorkTracker() {
        return workTracker;
    }

    public boolean addWorkLog(WorkLog workLog) {
        return workTracker.addWorkLog(workLog);
    }

    public boolean removeWorkLog(WorkLog workLog) {
        return workTracker.removeWorkLog(workLog);
    }

    public Date getCreationDate() {
        return creationDate;
    }
}
