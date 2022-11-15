package com.codestates.mainproject.auth.service;

import com.codestates.mainproject.auth.GoogleOauth;
import com.codestates.mainproject.auth.dto.GetSocialOAuthRes;
import com.codestates.mainproject.auth.dto.GoogleOAuthToken;
import com.codestates.mainproject.auth.dto.GoogleUser;
import com.codestates.mainproject.auth.exception.CustomAuthException;
import com.codestates.mainproject.auth.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class OauthService {

    private final GoogleOauth googleOauth;


    public GetSocialOAuthRes oAuthLogin(String socialLohinType, String code) throws CustomAuthException {
        GetSocialOAuthRes result;
        switch (socialLohinType){
            case "GOOGLE" : {
                try{
                    // 응답 객체가 JSON 형식으로 되어 있으므로, 이를 역직렬화해서 자바 객체로 담는다.
                    GoogleOAuthToken oAuthToken = googleOauth.getAccessToken(code);

                    // 엑세스 토큰을 다시 구글로 보내 구글에 저장된 사용자 정보가 담긴 응답 객체를 받아온다.
                    ResponseEntity<String> userInfoResponse = googleOauth.requestUserInfo(oAuthToken);

                    //다시 JSON 형식의 응답 객체를 자바 객체로 역직렬화한다.
                    GoogleUser googleUser = googleOauth.getUserInfo(userInfoResponse);
                    log.info("googleUser : " + googleUser.getEmail());
                    result = new GetSocialOAuthRes(googleUser.email);
                    break;
                } catch (Exception e) {
                    log.error(">>>" + e.getMessage());
                    throw new CustomAuthException(ExceptionCode.OAUTH_LOGIN_FAILED);
                }
            }
            default: {
                throw new CustomAuthException(ExceptionCode.INVALID_SOCIAL_LOGIN_TYPE);
            }
        }
        return result;
    }
}
