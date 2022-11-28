package com.codestates.mainproject.member.entity;

import com.codestates.mainproject.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long friendId;
//
//    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "REQUESTER_ID")
    private Member requester;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "RESPONDENT_ID")
    private Member respondent;


    public Friend(Member requester, Member respondent) {
        this.requester = requester;
        this.respondent = respondent;
    }
}
