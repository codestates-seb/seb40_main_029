package com.codestates.mainproject.mail.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class MailResponseDto {
    private Long mailId;
    private Long senderId;
    private Long RaceiverId;

    private String body;
    private String senderName;
    private String raceiverName;

    private LocalDateTime createdAt;
}
