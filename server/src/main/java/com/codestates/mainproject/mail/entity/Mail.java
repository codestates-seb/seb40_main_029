package com.codestates.mainproject.mail.entity;

import com.codestates.mainproject.audit.Auditable;
import com.codestates.mainproject.member.entity.Member;
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

public class Mail extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mailId;

    @Column(nullable = false, length = 600)
    private String body;

//    private long mailCost; <필요 없음>

    private boolean verify;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private Member sender;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id")
    private Member receiver;

}
