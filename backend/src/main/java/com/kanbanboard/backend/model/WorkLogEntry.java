package com.kanbanboard.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "work-log-entries")
public class WorkLogEntry {

    @Id
    private String id;

    private int amount;

    private Date creationDate;


}
