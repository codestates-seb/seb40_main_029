package com.codestates.mainproject.mail.dto;

import com.codestates.mainproject.member.dto.MemberResponseDto;
import com.codestates.mainproject.member.entity.Member;
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

    private String body;
    private Member sender;
    private Member receiver;

    private LocalDateTime createdAt;
}
