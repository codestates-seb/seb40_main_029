package com.codestates.mainproject.member.entity;

import com.codestates.mainproject.member.role.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    private String displayName;

    private long point;

    private Role role;

    public Member(String displayName) {
        this.displayName = displayName;
    }
}
