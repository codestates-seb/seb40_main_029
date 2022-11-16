package com.codestates.mainproject.mood.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MoodPatchDto {

    private String paletteCode;

    private String moodCode;

    private String body;
}
