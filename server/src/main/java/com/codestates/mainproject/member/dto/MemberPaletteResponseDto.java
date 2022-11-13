package com.codestates.mainproject.member.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MemberPaletteResponseDto {

    private String paletteCode;
    private String paletteName;
}
