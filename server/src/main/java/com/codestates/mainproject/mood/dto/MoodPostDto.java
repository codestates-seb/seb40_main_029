package com.codestates.mainproject.mood.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MoodPostDto {

    private String paletteCode;

    private String moodCode;

    private String body;
}
