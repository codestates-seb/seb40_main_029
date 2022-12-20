package com.example.omu.domain.palette.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@NoArgsConstructor
public class MoodPaletteDetails {

    @Id
    private Long moodPaletteDetailsId;

    private String paletteCode;

    private String moodCode;

    private String colorCode;

    private String mood;

    public static MoodPaletteDetails builder(
            String paletteCode,
            String moodCode,
            String colorCode,
            String mood){
        return MoodPaletteDetails.builder(paletteCode, moodCode, colorCode, mood);
    }
}
