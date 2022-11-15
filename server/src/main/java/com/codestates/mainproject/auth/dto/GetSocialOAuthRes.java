package com.codestates.mainproject.auth.dto;

import com.codestates.mainproject.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class GetSocialOAuthRes {
    String email;

    public GetSocialOAuthRes(Member member){
        this.email = member.getEmail();
    }
}

//구글에 일회성 코드를 다시 보내 받아올 액세스 토큰을 포함한 JSON 문자열을 담을 클래스
