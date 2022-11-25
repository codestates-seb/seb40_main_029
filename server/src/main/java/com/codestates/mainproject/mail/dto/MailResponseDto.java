package com.codestates.mainproject.mail.dto;

import com.codestates.mainproject.member.dto.MemberResponseDto;
import com.codestates.mainproject.member.entity.Member;
import lombok.*;

import java.time.LocalDate;
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

    private String senderDisplayName;

    private String receiverDisplayName;

    private Boolean verifyMail;

    private LocalDateTime createdAt;

    @Builder
    public MailResponseDto(Long mailId, String body, Boolean verifyMail, Long senderId, Long receiverId, String senderDisplayName, String receiverDisplayName,  LocalDateTime createdAt){
        this.mailId = mailId;
        this.body = body;
        this.verifyMail = verifyMail;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.senderDisplayName = senderDisplayName;
        this.receiverDisplayName = receiverDisplayName;
        this.createdAt = createdAt;
    }
}
