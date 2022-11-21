package com.codestates.mainproject.mail.mapper;

import com.codestates.mainproject.mail.dto.MailResponseDto;
import com.codestates.mainproject.mail.entity.Mail;
import org.springframework.stereotype.Component;

@Component
public class MailMapeerImpl  {

    public MailResponseDto mailToMailResponseDto(Mail mail) {
        return new MailResponseDto(
                mail.getMailId(),
                mail.getBody(),
                mail.getSender().getMemberId(),
                mail.getReceiver().getMemberId(),
                mail.isVerifyMail(),
                mail.getCreatedAt());
    }
}
