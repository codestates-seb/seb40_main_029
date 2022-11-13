package com.codestates.mainproject.member.entity;

import com.codestates.mainproject.member.role.Role;
import com.codestates.mainproject.palette.entity.MemberPalette;
import com.codestates.mainproject.palette.entity.MoodPalette;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@Entity
@Table
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Column(nullable = false, length = 50)
    private String displayName;

    @Column(nullable = false)
    private String palette;

    @Column(nullable = false)
    private long point;

    @Column(nullable = false)
    private Role role;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<MemberPalette> palettes = new ArrayList<>();


    public Member(String displayName) {
        this.displayName = displayName;
    }

}
