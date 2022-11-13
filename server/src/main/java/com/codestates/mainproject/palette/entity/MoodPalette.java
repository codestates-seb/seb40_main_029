package com.codestates.mainproject.palette.entity;

import com.codestates.mainproject.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class MoodPalette {

    @Id
    private String paletteCode;

    @Column(nullable = false)
    private String paletteName;


}
