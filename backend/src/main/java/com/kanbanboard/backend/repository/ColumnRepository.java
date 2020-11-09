package com.kanbanboard.backend.repository;

import com.kanbanboard.backend.model.Column;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ColumnRepository extends MongoRepository<Column, String> {
}
