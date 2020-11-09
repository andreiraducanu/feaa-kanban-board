package com.kanbanboard.backend.model;

import com.kanbanboard.backend.model.base.AbstractDocument;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Document(collection = "projects")
public class Project extends AbstractDocument {

    private String name;

    private String description;

    @DBRef
    private User owner;

    @DBRef
    private final List<User> members;

    @DBRef
    private final List<Column> columns;

    private final Date creationDate;

    @PersistenceConstructor
    Project(String name, String description, User owner, List<User> members, List<Column> columns, Date creationDate) {
        this.name = name;
        this.description = description;
        this.owner = owner;
        this.members = members;
        this.columns = columns;
        this.creationDate = creationDate;
    }

    public Project(String name, String description, User owner) {
        this(name, description, owner, new ArrayList<>(), new ArrayList<>(), Calendar.getInstance().getTime());
    }

    
}
