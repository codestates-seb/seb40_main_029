package com.example.omu.domain.mood.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MoodPostDto {

    private String paletteCode;

    private String moodCode;

    private String body;
}
