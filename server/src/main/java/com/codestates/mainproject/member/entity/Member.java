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

    @Column(nullable = false, length = 50)
    private String displayName;

    @Column(nullable = false)
    private long point;

    @Column(nullable = false)
    private Role role;

    public Member(String displayName) {
        this.displayName = displayName;
    }
}
