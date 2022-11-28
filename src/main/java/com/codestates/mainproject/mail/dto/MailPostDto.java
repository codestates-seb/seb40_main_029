package com.codestates.mainproject.mail.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MailPostDto {
    private String body;
    private String senderName;
    private String receiverName;

}
