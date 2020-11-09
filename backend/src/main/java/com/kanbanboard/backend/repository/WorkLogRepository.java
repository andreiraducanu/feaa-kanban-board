package com.kanbanboard.backend.repository;

import com.kanbanboard.backend.model.WorkLog;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WorkLogRepository extends MongoRepository<WorkLog, String> {
}
