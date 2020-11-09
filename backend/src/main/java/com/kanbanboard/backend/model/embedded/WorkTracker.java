package com.kanbanboard.backend.model.embedded;

import com.kanbanboard.backend.model.WorkLog;
import org.springframework.data.annotation.PersistenceConstructor;

import java.util.ArrayList;
import java.util.List;


public class WorkTracker {

    private int totalTime;

    private int currentTime;

    private final List<WorkLog> workLogs;

    @PersistenceConstructor
    WorkTracker(int totalTime, int currentTime, List<WorkLog> workLogs) {
        this.totalTime = totalTime;
        this.currentTime = currentTime;
        this.workLogs = workLogs;
    }

    public WorkTracker(int totalTime) {
        this(totalTime, 0, new ArrayList<>());
    }

    public int getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(int totalTime) {
        this.totalTime = totalTime;
    }

    public int getCurrentTime() {
        return currentTime;
    }

    public List<WorkLog> getWorkLogs() {
        return workLogs;
    }

    public boolean addWorkLog(WorkLog workLog) {
        if (workLogs.contains(workLog))
            return false;

        if (currentTime + workLog.getTime() > totalTime)
            return false;

        workLogs.add(workLog);
        currentTime += workLog.getTime();
        return true;
    }

    public boolean removeWorkLog(WorkLog workLog) {
        if (!workLogs.remove(workLog))
            return false;

        currentTime -= workLog.getTime();
        return true;
    }
}
