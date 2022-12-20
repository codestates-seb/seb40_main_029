package com.example.omu.domain.palette.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;



@Getter
@Setter
@NoArgsConstructor
public class MoodPalette {

    @Id
    private String paletteCode;

    private String paletteName;


}
