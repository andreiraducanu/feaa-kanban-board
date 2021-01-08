package com.kanbanboard.backend.service.impl;

import com.kanbanboard.backend.controller.UserController;
import com.kanbanboard.backend.dto.ProjectDto;
import com.kanbanboard.backend.dto.UserDto;
import com.kanbanboard.backend.exception.EntityNotFoundException;
import com.kanbanboard.backend.model.Project;
import com.kanbanboard.backend.model.User;
import com.kanbanboard.backend.repository.ProjectRepository;
import com.kanbanboard.backend.repository.UserRepository;
import com.kanbanboard.backend.security.UserPrincipal;
import com.kanbanboard.backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserDetailsService, UserService {

    private final ModelMapper modelMapper;

    private final UserRepository userRepository;

    private final ProjectRepository projectRepository;

    @Autowired
    UserServiceImpl(ModelMapper modelMapper, UserRepository userRepository, ProjectRepository projectRepository) {
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }

    public UserDto get(String username) throws EntityNotFoundException {
        User user = findUserByUsername(username);
        if (user == null)
            throw new EntityNotFoundException("No user found");

        return convertUserToDto(user);
    }

    public boolean checkIfUserExists(String userName) {
        return userRepository.existsByUsername(userName);
    }

    public void saveNewUser(User user) {
        userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(userName);
        if (user == null) {
            throw new UsernameNotFoundException(userName);
        }
        return new UserPrincipal(user);
    }

    private User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public List<UserDto> getAll(String projectId) throws EntityNotFoundException {
        List<User> users;

        Project project = findProjectById(projectId);

        users = userRepository.findAll();

        Logger logger = LoggerFactory.getLogger(UserController.class);

        //users.remove(project.getOwner());

        return convertUserToDto(users);
    }

    private UserDto convertUserToDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }

    private List<UserDto> convertUserToDto(List<User> users) {
        return users.stream()
                .map(this::convertUserToDto)
                .collect(Collectors.toList());
    }

    private Project findProjectById(String id) {
        return projectRepository.findById(id).orElse(null);
    }
}
