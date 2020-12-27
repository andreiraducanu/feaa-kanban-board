package com.kanbanboard.backend.service;

import com.kanbanboard.backend.model.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {
    boolean checkIfUserExists(String username);

    void saveNewUser(User user);

    UserDetails loadUserByUsername(String username);
}