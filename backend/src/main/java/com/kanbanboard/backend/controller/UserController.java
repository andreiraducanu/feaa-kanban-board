package com.kanbanboard.backend.controller;

import com.kanbanboard.backend.dto.LoginDto;
import com.kanbanboard.backend.dto.UserLoginDto;
import com.kanbanboard.backend.dto.UserLoginResponseDto;
import com.kanbanboard.backend.dto.UserRegisterResponseDto;
import com.kanbanboard.backend.model.User;
import com.kanbanboard.backend.service.UserService;
import com.kanbanboard.backend.util.JwtUtil;
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
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;


@RestController
@RequestMapping("/user")
public class UserController {

    Logger logger = LoggerFactory.getLogger(UserController.class);

    private UserService userService;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtUtil jwtUtil;

    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody User user) {
        UserRegisterResponseDto userRegisterResponseDto = new UserRegisterResponseDto();

        if (userService.checkIfUserExists(user.getUsername())) {
            userRegisterResponseDto.setMessage("Choose another username! It already exists!");
            userRegisterResponseDto.setStatus("409");
            return new ResponseEntity<>(userRegisterResponseDto, HttpStatus.CONFLICT);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userService.saveNewUser(user);

        userRegisterResponseDto.setMessage("The account was created");
        userRegisterResponseDto.setStatus("200");

        return new ResponseEntity<>(userRegisterResponseDto, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginDto userLoginDto) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userLoginDto.getUsername(), userLoginDto.getPassword())
            );
        } catch (BadCredentialsException e) {
            UserLoginResponseDto userLoginResponseDto = new UserLoginResponseDto();
            userLoginResponseDto.setMessage("Bad username/password");
            userLoginResponseDto.setStatus("401");
            return new ResponseEntity<>(userLoginResponseDto, HttpStatus.CONFLICT);
        }

        final UserDetails userDetails = userService.loadUserByUsername(userLoginDto.getUsername());

        final String jwt = jwtUtil.generateToken(userDetails);

        return new ResponseEntity<>(new LoginDto(jwt, userService.get(userLoginDto.getUsername())), HttpStatus.OK);
    }

    @GetMapping("/test")
    public String testRoute(@RequestBody String test, Principal principal) {
        logger.info(principal.getName());
        return test;
    }


}
