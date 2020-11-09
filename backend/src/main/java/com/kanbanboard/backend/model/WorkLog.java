package com.kanbanboard.backend.model;

import com.kanbanboard.backend.model.base.AbstractDocument;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Calendar;
import java.util.Date;

@Document(collection = "work-logs")
public class WorkLog extends AbstractDocument {

    @DBRef
    private final User user;

    private int time;

    private final Date creationDate;

    @PersistenceConstructor
    WorkLog(User user, int time, Date creationDate) {
        this.user = user;
        this.time = time;
        this.creationDate = creationDate;
    }

    public WorkLog(User user, int time) {
        this(user, time, Calendar.getInstance().getTime());
    }

    public User getUser() {
        return user;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public Date getCreationDate() {
        return creationDate;
    }
}
