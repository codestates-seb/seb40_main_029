package com.codestates.mainproject.palette.entity;

import com.codestates.mainproject.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class MemberPalette {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberPaletteId;

    @JsonBackReference
    @ManyToOne
    private Member member;

    @ManyToOne
    private MoodPalette moodPalette;

    public MemberPalette(MoodPalette moodPalette) {
        this.moodPalette = moodPalette;
    }
}
