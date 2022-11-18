package com.codestates.mainproject.member.entity;

import com.codestates.mainproject.member.role.Role;
import com.codestates.mainproject.mood.entity.Mood;
import com.codestates.mainproject.palette.entity.MemberPalette;
import com.codestates.mainproject.palette.entity.MoodPalette;
import com.codestates.mainproject.todo.entity.Todo;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @Column(name = "memberId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    private String email;

    @Column(nullable = false, length = 50)
    private String displayName;

    @Column(nullable = false)
    private String palette;

    @Column(nullable = false)
    private long point;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "MEMBER_ID")
    private List<MemberPalette> palettes = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST)
    private List<Todo> todoList = new ArrayList<>();

    @JsonBackReference
    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST)
    private List<Mood> moodList = new ArrayList<>();


    public Member(String displayName) {
        this.displayName = displayName;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }
}
