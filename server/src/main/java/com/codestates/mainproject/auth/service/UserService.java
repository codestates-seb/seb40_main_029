package com.codestates.mainproject.auth.service;

import com.codestates.mainproject.auth.GoogleUser;
import com.codestates.mainproject.auth.OAuthToken;
import com.codestates.mainproject.auth.TokenResponse;
import com.codestates.mainproject.auth.jwt.JwtProvider;
import com.codestates.mainproject.exception.BusinessLogicException;
import com.codestates.mainproject.exception.ExceptionCode;
import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.member.repository.MemberRepository;
import com.codestates.mainproject.member.role.Role;
import com.codestates.mainproject.mood.repository.MoodRepository;
import com.codestates.mainproject.palette.entity.MemberPalette;
import com.codestates.mainproject.palette.entity.MoodPalette;
import com.codestates.mainproject.palette.repository.MoodPaletteRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {


    private final MemberRepository memberRepository;
    private final MoodPaletteRepository moodPaletteRepository;
    private final OAuthService oAuthService;
    private final JwtProvider jwtProvider;


    public TokenResponse oauthLogin(String code) throws Exception {
        ResponseEntity<String> accessTokenResponse = oAuthService.createPostRequest(code);
        OAuthToken oAuthToken = oAuthService.getAccessToken(accessTokenResponse);
        log.info("Access Token: {}", oAuthToken.getAccessToken());

        ResponseEntity<String> userInfoResponse = oAuthService.createGetRequest(oAuthToken);
        log.info(userInfoResponse.getBody());
        GoogleUser googleUser = oAuthService.getUserInfo(userInfoResponse);
        log.info("Google User email: {}", googleUser.getEmail());

        if(!isJoinedUser(googleUser)) {
            signUp(googleUser, oAuthToken);
        }
        Member member = memberRepository.findByEmail(googleUser.getEmail()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        log.info(member.getEmail());
        TokenResponse tokenResponse = jwtProvider.createTokensByLogin(member);
        if(member.getDisplayName() == null){
            tokenResponse.setNewUser(true);
        } else {
            tokenResponse.setNewUser(false);
        }
        tokenResponse.setEmail(member.getEmail());
        return tokenResponse;
    }

    public Claims oauthVerify(String jwt) throws Exception {
        return jwtProvider.verifyToken(jwt);
    }

    public TokenResponse oauthLoginTest() throws Exception {

        Member member = new Member();
        member.setEmail("yryn2016@gmail.com");
        member.setMemberId(3);

        TokenResponse tokenResponse = jwtProvider.createTokensByLogin(member);
        tokenResponse.setEmail(member.getEmail());
        return tokenResponse;
    }

    private boolean isJoinedUser(GoogleUser googleUser) {
        Optional<Member> members = memberRepository.findByEmail(googleUser.getEmail());
        log.info("Joined User: {}", members);
        return members.isPresent();
    }

    private void signUp(GoogleUser googleUser, OAuthToken oAuthToken) {
        Member member = googleUser.toUser(googleUser.getEmail());
        String basicCode = "P001";
        MoodPalette basicPalette = moodPaletteRepository.findById("P001").orElseThrow(() -> new BusinessLogicException(ExceptionCode.PALETTE_NOT_FOUND));

        member.setPalette(basicPalette.getPaletteName());
        member.setRole(Role.USER);
        member.setPoint(500);
        member.getPalettes().add(new MemberPalette(basicPalette));
        memberRepository.save(member);
    }
}
