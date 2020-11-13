package com.kanbanboard.backend.repository;

import com.kanbanboard.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
  
    public Boolean existsByUsername(String userName);

    public User findByUsername(String username);
}
