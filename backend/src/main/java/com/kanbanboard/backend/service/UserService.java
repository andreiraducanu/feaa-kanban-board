package com.kanbanboard.backend.service;

import com.kanbanboard.backend.dto.ProjectDto;
import com.kanbanboard.backend.dto.UserDto;
import com.kanbanboard.backend.exception.EntityNotFoundException;
import com.kanbanboard.backend.model.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserService {
    boolean checkIfUserExists(String username);

    void saveNewUser(User user);

    UserDto get(String username) throws EntityNotFoundException;

    UserDetails loadUserByUsername(String username);

    List<UserDto> getNonMembers(String projectId) throws EntityNotFoundException;

    List<UserDto> getAll() throws EntityNotFoundException;
}