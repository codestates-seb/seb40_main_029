package com.codestates.mainproject.auth.controller;

import com.codestates.mainproject.auth.TokenResponse;
import com.codestates.mainproject.auth.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.script.ReactiveScriptExecutor;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RequiredArgsConstructor
@Controller
public class UserController {

    private static final String ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
    private static final String CLIENT_ID = "840805606859-diamap7b8svl8fhe3kqt1bmjsi6aieg9.apps.googleusercontent.com";
    private static final String REDIRECT_URI = "http://localhost:8080/oauth/google";
    private static final String RESPONSE_TYPE = "code";
    private static final String SCOPE = "https://www,googleapis.com/auth/userinfo.email"; // https://www,googleapis.com/auth/userinfo.profile";

    private final UserService userService;
    private final RestTemplate restTemplate;


    @GetMapping("/login")
    public String login() {
        String url = ENDPOINT;

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", CLIENT_ID);
        params.add("scope", SCOPE);
        params.add("redirect_uri", REDIRECT_URI);
        params.add("response_type", RESPONSE_TYPE);

//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");


        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(params);
         return restTemplate.exchange(url, HttpMethod.GET, httpEntity, String.class).getBody();
    }

    @GetMapping("/oauth/google")
    public ResponseEntity<TokenResponse> oauthLogin(String code) throws Exception {
            log.info(code);
            TokenResponse token = userService.oauthLogin(code);
            log.info(token.getAccessToken());
            return new ResponseEntity(token, HttpStatus.OK);
    }

        @GetMapping("/oauth/test")
    public ResponseEntity<TokenResponse> oauthTest() throws Exception {
            TokenResponse token = userService.oauthLoginTest();
            log.info(token.getAccessToken());
            return new ResponseEntity(token, HttpStatus.OK);
    }

    @GetMapping("/oauth/verify")
    public ResponseEntity<TokenResponse> oauthCheckTest(String token) throws Exception {
        Claims b = userService.oauthVerify(token);
        return new ResponseEntity(b, HttpStatus.OK);
    }

}
