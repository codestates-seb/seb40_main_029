package com.codestates.mainproject.member.dto;

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
    private Long memberId;
    private String displayName;
    private String palette;
    private Long point;
    private Role role;
    private List<MemberPalette> palettes;
}
