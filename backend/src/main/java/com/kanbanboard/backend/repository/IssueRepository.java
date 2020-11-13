package com.kanbanboard.backend.repository;

import com.kanbanboard.backend.model.Issue;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IssueRepository extends MongoRepository<Issue, String> {
}
