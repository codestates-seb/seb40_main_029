package com.codestates.mainproject.mail.dto;

import com.codestates.mainproject.member.dto.MemberResponseDto;
import com.codestates.mainproject.member.entity.Member;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MailResponseDto {
    private Long mailId;

    private String body;

    private Long senderId;

    private Long receiverId;

    private Boolean verifyMail;

    private LocalDateTime createdAt;

    @Builder
    public MailResponseDto(Long mailId, String body, Boolean verifyMail, Long senderId, Long receiverId, LocalDateTime createdAt){
        this.mailId = mailId;
        this.body = body;
        this.verifyMail = verifyMail;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.createdAt = createdAt;
    }
}
