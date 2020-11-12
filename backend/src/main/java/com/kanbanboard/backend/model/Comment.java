package com.kanbanboard.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@TypeAlias("comment")
@Document(collection = "comments")
public class Comment{

    @Id
    private String id;

    private User user;

    private String text;

    private Date creationDate;
}
