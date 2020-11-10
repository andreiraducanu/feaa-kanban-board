package com.kanbanboard.backend.model;

import lombok.Data;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@TypeAlias("workTracker")
@Document(collection = "workTrackers")
public class WorkTracker {

    private int totalTime;

    private int currentTime;

    private List<WorkLog> workLogs;
}
