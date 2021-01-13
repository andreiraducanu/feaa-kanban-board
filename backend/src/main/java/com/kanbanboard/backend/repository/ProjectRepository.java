package com.kanbanboard.backend.repository;

import com.kanbanboard.backend.model.Column;
import com.kanbanboard.backend.model.Project;
import com.kanbanboard.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProjectRepository extends MongoRepository<Project, String> {

    List<Project> findByOwner(User owner);
}
