package com.example.omu.domain.mood.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MoodPatchDto {

    private String paletteCode;

    @Setter private String moodCode;

    @Setter private String body;
}
