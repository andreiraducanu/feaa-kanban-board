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

    private Issue epic;

    private Issue parent;

    private List<Issue> children;

    private User reporter;

    private User assignee;

    private List<Comment> comments;

    private int totalWorkTime;

    private int currentWorkTime;

    private List<WorkLog> workLogs;

    private Date creationDate;

    public boolean addWorklog(WorkLog workLog) {
        if (workLogs == null)
            workLogs = new ArrayList<>();

        if (currentWorkTime + workLog.getTime() > totalWorkTime)
            return false;

        currentWorkTime += workLog.getTime();

        workLogs.add(workLog);

        return true;
    }

    public boolean updateWorkLog(WorkLog workLog) {
        if (workLogs == null)
            workLogs = new ArrayList<>();

        if (currentWorkTime + workLog.getTime() > totalWorkTime)
            return false;

        WorkLog oldWorkLog = workLogs.get(workLogs.indexOf(workLog));

        currentWorkTime -= oldWorkLog.getTime();

        currentWorkTime += workLog.getTime();

        oldWorkLog.setTime(workLog.getTime());

        return true;
    }

    public boolean removeWorkLog(WorkLog workLog) {
        if (workLogs == null)
            workLogs = new ArrayList<>();

        currentWorkTime -= workLog.getTime();

        workLogs.remove(workLog);

        return true;
    }
}
