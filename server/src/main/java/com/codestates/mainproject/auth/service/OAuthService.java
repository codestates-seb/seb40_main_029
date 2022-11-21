package com.codestates.mainproject.auth.service;

import com.codestates.mainproject.auth.GoogleUser;
import com.codestates.mainproject.auth.OAuthToken;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.dynamic.scaffold.MethodGraph;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
public class OAuthService {
    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;

    private static final String CLIENT_ID = "";
    private static final String CLIENT_SECRET = "";
    private static final String REDIRECT_URI = "http://localhost:3000";
    private static final String GRANT_TYPE = "authorization_code";

    public OAuthService(RestTemplate restTemplate) {
        this.objectMapper = new ObjectMapper().setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
        this.restTemplate = restTemplate;
    }

    public ResponseEntity<String> createPostRequest(String code) {
        String url = "https://oauth2.googleapis.com/token";

        log.info(code);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", CLIENT_ID);
        params.add("client_secret", CLIENT_SECRET);
        params.add("redirect_uri", REDIRECT_URI);
        params.add("grant_type", GRANT_TYPE);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");


        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(params, headers);
        return restTemplate.exchange(url, HttpMethod.POST, httpEntity, String.class);
    }

    public OAuthToken getAccessToken(ResponseEntity<String> response) {
        OAuthToken oAuthToken = null;
        try {
            oAuthToken = objectMapper.readValue(response.getBody(), OAuthToken.class);
            } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return oAuthToken;
    }

    public ResponseEntity<String> createGetRequest(OAuthToken oAuthToken) {
        String url = "https://www.googleapis.com/oauth2/v1/userinfo";

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + oAuthToken.getAccessToken());

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity(headers);

        return restTemplate.exchange(url, HttpMethod.GET, request, String.class);
    }

    public GoogleUser getUserInfo(ResponseEntity<String> userInfoResponse) {
        GoogleUser googleUser = null;
        try {
            googleUser = objectMapper.readValue(userInfoResponse.getBody(), GoogleUser.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return googleUser;
    }
}
