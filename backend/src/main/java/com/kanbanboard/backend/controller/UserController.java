package com.kanbanboard.backend.controller;

import com.kanbanboard.backend.dto.JwtDto;
import com.kanbanboard.backend.dto.UserLoginDto;
import com.kanbanboard.backend.dto.UserRegisterDto;
import com.kanbanboard.backend.model.User;
import com.kanbanboard.backend.service.JwtService;
import com.kanbanboard.backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.security.Principal;

@RestController
public class UserController {

    private final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final ModelMapper modelMapper;

    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService, ModelMapper modelMapper) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginDto userDto) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userDto.getUsername(), userDto.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password");
        }

        final UserDetails userDetails = userService.loadUserByUsername(userDto.getUsername());

        final String jwt = jwtService.generateToken(userDetails);

        return new ResponseEntity<>(new JwtDto(jwt), HttpStatus.OK);
    }

    @PostMapping("/user/register")
    public ResponseEntity<String> register(@Valid @RequestBody UserRegisterDto userDto) {
        User user = modelMapper.map(userDto, User.class);

        if (userService.checkIfUserExists(user.getUsername())) {
            return new ResponseEntity<>("Choose another username! It already exists!", HttpStatus.CONFLICT);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userService.saveNewUser(user);

        return new ResponseEntity<>("ok", HttpStatus.OK);
    }

    @GetMapping("/test")
    public String testRoute(@RequestBody String test, Principal principal) {
        logger.info(principal.getName());
        return test;
    }
}
