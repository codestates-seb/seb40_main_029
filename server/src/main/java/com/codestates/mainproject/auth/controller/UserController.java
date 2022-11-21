package com.codestates.mainproject.auth.controller;

import com.codestates.mainproject.auth.TokenResponse;
import com.codestates.mainproject.auth.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.script.ReactiveScriptExecutor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@Slf4j
@Controller
public class UserController {

    private static final String ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
    private static final String CLIENT_ID = "840805606859-39e9r3frr8317aebpc8ld7comhnkgoli.apps.googleusercontent.com";
    private static final String REDIRECT_URI = "http://localhost:3000/";
    private static final String RESPONSE_TYPE = "code";
    private static final String SCOPE = "https://www,googleapis.com/auth/userinfo.email https://www,googleapis.com/auth/userinfo.profile";

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

//    @GetMapping("/login")
//    public String login() {
//        return "redirect: " + ENDPOINT + "?client_id=" + CLIENT_ID + "&redirect_uri=" + REDIRECT_URI
//                + "&response_type=" + RESPONSE_TYPE + "&scope=" + SCOPE;
//    }

    @GetMapping("/oauth/google")
    public ResponseEntity<TokenResponse> oauthLogin(String code) throws JsonProcessingException {
        log.info(code);
        TokenResponse token = userService.oauthLogin(code);
        log.info(token.getAccessToken());
        return new ResponseEntity(token, HttpStatus.OK);
    }
}
