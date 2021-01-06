package com.kanbanboard.backend.service;

import com.kanbanboard.backend.dto.UserDto;
import com.kanbanboard.backend.exception.EntityNotFoundException;
import com.kanbanboard.backend.model.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {
    boolean checkIfUserExists(String username);

    void saveNewUser(User user);

    UserDto get(String username) throws EntityNotFoundException;

    UserDetails loadUserByUsername(String username);
}