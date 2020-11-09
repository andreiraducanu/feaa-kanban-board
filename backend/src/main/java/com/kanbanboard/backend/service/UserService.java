package com.kanbanboard.backend.service;

import com.kanbanboard.backend.UserPrincipal;
import com.kanbanboard.backend.model.User;
import com.kanbanboard.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.io.UnsupportedEncodingException;

@Service
public class UserService implements UserDetailsService {

    Logger logger = LoggerFactory.getLogger(UserService.class);

    UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    public String getMD5(String password) throws UnsupportedEncodingException {
        logger.info("getMD5 function");
        byte[] message = password.getBytes("UTF-8");
        String hash = DigestUtils.md5DigestAsHex(message);
        return hash;
    }

    public Boolean checkIfUserExits(String userName) {
        return userRepository.existsByUsername(userName);
    }

    public void saveNewUser(User user) {
        userRepository.save(user);
    }


    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(userName);
        if (user == null) {
            logger.info("user doesn't exists");
            throw new UsernameNotFoundException(userName);
        }
        logger.info("USER EXITS");
        return new UserPrincipal(user);
    }
}
