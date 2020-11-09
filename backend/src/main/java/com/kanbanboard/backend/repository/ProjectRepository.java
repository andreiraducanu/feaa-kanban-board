package com.kanbanboard.backend.repository;

import com.kanbanboard.backend.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProjectRepository extends MongoRepository<Project, String> {
}
