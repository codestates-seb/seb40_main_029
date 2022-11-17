package com.codestates.mainproject.mood.entity;

import com.codestates.mainproject.audit.Auditable;
import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.palette.entity.MoodPaletteDetails;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
public class Mood extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long moodId;

    @Column(nullable = false)
    private String moodCode;

    @Column(nullable = false)
    private String paletteCode;

    @Column(length = 200)
    private String body;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "MOOD_PALETTE_DETAILS_ID")
    private MoodPaletteDetails moodPaletteDetails;
}
