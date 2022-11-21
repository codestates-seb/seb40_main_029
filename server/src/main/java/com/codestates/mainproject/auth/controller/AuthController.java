package com.codestates.mainproject.auth.controller;

import com.codestates.mainproject.auth.common.CommonCode;
import com.codestates.mainproject.auth.common.CommonResponse;
import com.codestates.mainproject.auth.dto.GetSocialOAuthRes;
import com.codestates.mainproject.auth.authexception.CustomAuthException;
import com.codestates.mainproject.auth.service.OauthService;
import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/auth")
public class AuthController {

    private final MemberRepository memberRepository;
    private final OauthService oauthService;

    @GetMapping("/oauth/{socialLoginType}")
    public CommonResponse accessOauth(@PathVariable("socialLoginType") String oauthType, @RequestParam("code") String code) throws CustomAuthException {
        GetSocialOAuthRes res = oauthService.oAuthLogin(oauthType.toUpperCase(), code);
        Member member = memberRepository.findByEmail(res.getEmail())
                .orElseThrow(() -> new RuntimeException("MEMBER NOT FOUND"));
        if(member == null){
            return new CommonResponse(CommonCode.OAUTH_CHECK_SUCCESS, Map.of("userInfo", res));
        } else {
            return new CommonResponse(CommonCode.USER_ALREADY_EXIST, Map.of("userInfo", new GetSocialOAuthRes(member)));
        }

    }
}
