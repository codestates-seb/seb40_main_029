package com.codestates.mainproject.member.dto;

//import com.codestates.mainproject.member.entity.Friend;
import com.codestates.mainproject.member.role.Role;

import com.codestates.mainproject.palette.entity.MemberPalette;
import com.codestates.mainproject.palette.entity.MoodPalette;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseDto {
    private Long memberId; //회원번호
    private String email; //회원 이메일
    private String displayName; //회원 닉네임
    private String palette; //회원이 사용하고 있는 팔레트
    private Long point; // 회원 포인트
    private Role role; //회원 권한
    private List<MemberPalette> palettes; //회원이 가지고 있는 팔레트 목록
    private List<String> friends; //회원이 친구추가한 회원의 닉네임
//    private List<Friend> friends;
}
