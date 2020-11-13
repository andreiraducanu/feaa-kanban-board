package com.kanbanboard.backend.service.impl;

import com.kanbanboard.backend.model.User;
import com.kanbanboard.backend.repository.UserRepository;
import com.kanbanboard.backend.security.UserPrincipal;
import com.kanbanboard.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserDetailsService, UserService {

    Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Boolean checkIfUserExists(String userName) {
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
}
