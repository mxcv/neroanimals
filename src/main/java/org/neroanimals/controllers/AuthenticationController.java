package org.neroanimals.controllers;

import org.neroanimals.dto.in.UserLogin;
import org.neroanimals.dto.in.UserRefresh;
import org.neroanimals.dto.out.UserAuthentication;
import org.neroanimals.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("login")
    public UserAuthentication login(@RequestBody UserLogin request) {
        return service.login(request);
    }

    @PostMapping("refresh")
    public UserAuthentication refresh(@RequestBody UserRefresh request) {
        return service.refresh(request);
    }
}
