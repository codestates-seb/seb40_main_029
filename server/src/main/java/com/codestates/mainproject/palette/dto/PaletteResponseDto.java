package com.codestates.mainproject.palette.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaletteResponseDto {

    private String paletteCode;
    private String moodCode;
    private String colorCode;
    private String mood;
}
