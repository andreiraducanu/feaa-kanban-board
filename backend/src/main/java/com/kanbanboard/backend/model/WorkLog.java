package com.kanbanboard.backend.model;

import com.kanbanboard.backend.model.base.AbstractDocument;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Calendar;
import java.util.Date;

@Document(collection = "work-logs")
public class WorkLog extends AbstractDocument {

    @Id
    private String id;

    @DBRef
    private final User user;

    private int amount;

    private final Date creationDate;

    @PersistenceConstructor
    WorkLog(User user, int amount, Date creationDate) {
        this.user = user;
        this.amount = amount;
        this.creationDate = creationDate;
    }

    public WorkLog(User user, int amount) {
        this(user, amount, Calendar.getInstance().getTime());
    }

    public User getUser() {
        return user;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Date getCreationDate() {
        return creationDate;
    }
}
