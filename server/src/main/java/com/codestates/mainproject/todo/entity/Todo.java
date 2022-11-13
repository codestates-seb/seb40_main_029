package com.codestates.mainproject.todo.entity;

import com.codestates.mainproject.audit.Auditable;
import com.codestates.mainproject.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table
public class Todo extends Auditable {

    @Id
    @Column(name = "todoId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long todoId;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false)
    private boolean selected;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
