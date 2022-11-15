package com.codestates.mainproject.mail.mapper;

import com.codestates.mainproject.mail.dto.MailPostDto;
import com.codestates.mainproject.mail.dto.MailResponseDto;
import com.codestates.mainproject.mail.entity.Mail;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-15T16:32:51+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.16.1 (Azul Systems, Inc.)"
)
@Component
public class MailMapperImpl implements MailMapper {

    @Override
    public Mail mailPostDtoToMail(MailPostDto mailPostDto) {
        if ( mailPostDto == null ) {
            return null;
        }

        Mail mail = new Mail();

        mail.setBody( mailPostDto.getBody() );

        return mail;
    }

    @Override
    public MailResponseDto mailToMailResponseDto(Mail mail) {
        if ( mail == null ) {
            return null;
        }

        MailResponseDto mailResponseDto = new MailResponseDto();

        mailResponseDto.setMailId( mail.getMailId() );
        mailResponseDto.setBody( mail.getBody() );
        mailResponseDto.setSender( mail.getSender() );
        mailResponseDto.setReceiver( mail.getReceiver() );
        mailResponseDto.setCreatedAt( mail.getCreatedAt() );

        return mailResponseDto;
    }

    @Override
    public List<MailResponseDto> mailsToMailResponseDtos(List<Mail> mails) {
        if ( mails == null ) {
            return null;
        }

        List<MailResponseDto> list = new ArrayList<MailResponseDto>( mails.size() );
        for ( Mail mail : mails ) {
            list.add( mailToMailResponseDto( mail ) );
        }

        return list;
    }
}
