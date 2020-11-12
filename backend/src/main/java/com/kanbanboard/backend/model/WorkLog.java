package com.kanbanboard.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@TypeAlias("workLog")
@Document(collection = "workLogs")
public class WorkLog  {

    @Id
    private String id;

    private User user;

    private int time;

    private Date creationDate;
}
