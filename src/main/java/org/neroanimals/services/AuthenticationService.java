package org.neroanimals.services;

import org.neroanimals.dto.in.UserLogin;
import org.neroanimals.dto.in.UserRefresh;
import org.neroanimals.dto.out.UserAuthentication;
import org.neroanimals.models.User;
import org.neroanimals.repositories.UserRepository;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public UserAuthentication login(UserLogin request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()));
        var user = repository.findByUsername(request.getUsername()).orElseThrow();
        return authenticate(user);
    }

    public UserAuthentication refresh(UserRefresh request) {
        var user = repository.findByUsername(jwtService.extractUsername(request.getRefreshToken())).orElseThrow();
        if (!user.getRefreshToken().equals(request.getRefreshToken()) || jwtService.isTokenExpired(request.getRefreshToken()))
            throw new JwtException("Refresh token is invalid");
        return authenticate(user);
    }

    private UserAuthentication authenticate(User user) {
        user.setRefreshToken(jwtService.generateRefreshToken(user));
        repository.save(user);
        return UserAuthentication.builder()
            .id(user.getId())
            .username(user.getUsername())
            .accessToken(jwtService.generateToken(user))
            .refreshToken(user.getRefreshToken())
            .build();
    }
}
