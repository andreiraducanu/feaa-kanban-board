package com.kanbanboard.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@TypeAlias("project")
@Document(collection = "projects")
public class Project {

    @Id
    private String id;

    private String name;

    private String description;

    private User owner;

    private List<User> members;

    private List<Column> columns;

    private Date creationDate;

    public boolean addColumn(Column column) {
        if (columns == null)
            columns = new ArrayList<>();

        if (columns.contains(column))
            return false;

        columns.add(column);
        return true;
    }

    public boolean removeColumn(Column column) {
        return columns.remove(column);
    }

    public boolean addMember(User member)
    {
        if(members==null)
            members = new ArrayList<>();

        if (members.contains(member))
            return false;

        members.add(member);
        return true;
    }
}
