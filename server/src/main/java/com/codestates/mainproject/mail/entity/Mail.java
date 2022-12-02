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

//    @Column(nullable = false, length = 600)
    private String body;

    @Column(nullable = false)
    private boolean verifyMail;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sender")
    private Member sender;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "receiver")
    private Member receiver;





}
