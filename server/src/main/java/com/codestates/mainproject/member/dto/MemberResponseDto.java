package com.codestates.mainproject.member.dto;

import com.codestates.mainproject.member.role.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponseDto {
    private Long memberId;
    private String displayName;
    private Long point;
    private Role role;
//    private Long point;
}
