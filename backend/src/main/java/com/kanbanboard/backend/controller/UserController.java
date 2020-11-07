package com.kanbanboard.backend.controller;

import com.kanbanboard.backend.model.User;
import com.kanbanboard.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public User add(@RequestBody User user){
        return userRepository.save(user);
    }
}
