package com.kanbanboard.backend.service;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;

public interface JwtService {

    String extractUsername(String token);

    Date extractExpirationDate(String token);

    String generateToken(UserDetails userDetails);

    boolean validateToken(String token, UserDetails userDetails);
}
