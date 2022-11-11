package com.codestates.mainproject.mail.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.print.attribute.standard.DateTimeAtCreation;

@Setter
@Getter
@Entity
@Table
@NoArgsConstructor

public class Mail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mailId;

    @Column(nullable = false, length = 600)
    private String content;

//    private long mailCost; <필요 없음>

    private boolean verify;

}
