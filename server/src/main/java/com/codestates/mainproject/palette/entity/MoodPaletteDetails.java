package com.codestates.mainproject.palette.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Table
@Entity
public class MoodPaletteDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long moodPaletteDetailsId;

//    @ManyToOne
//    @JoinColumn(name = "palette_code")
//    private MoodPalette moodPalette;

    @Column
    private String paletteCode;

    @Column(nullable = false, length = 10)
    private String moodCode;

    @Column(nullable = false, length = 10)
    private String colorCode;

    @Column(nullable = false, length = 20)
    private String mood;
}
