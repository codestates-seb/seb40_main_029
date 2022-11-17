package com.codestates.mainproject.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberPaletteResponseDto {

    private String paletteCode;
    private String paletteName;
}
