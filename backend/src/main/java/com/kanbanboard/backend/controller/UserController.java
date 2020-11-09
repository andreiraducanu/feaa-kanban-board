package com.kanbanboard.backend.controller;

import com.kanbanboard.backend.model.User;
import com.kanbanboard.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;


@RestController
@RequestMapping("/user")
public class UserController {

    Logger logger = LoggerFactory.getLogger(UserController.class);

    private UserService userService;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) throws UnsupportedEncodingException {

        logger.info("register called");
//        String hash = userService.getMD5("pass");

        if (userService.checkIfUserExits(user.getUsername())) {
            logger.info("User exists");
            return new ResponseEntity<>("Choose another username! It already exists!", HttpStatus.CONFLICT);
        }

        logger.info("User doesn't exists");
//        user.setPassword(userService.getMD5(user.getPassword()));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        logger.info(user.getPassword());
        userService.saveNewUser(user);
        return new ResponseEntity<>("ok", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {

        return new ResponseEntity<String>("Hahah", HttpStatus.OK);
    }


}
