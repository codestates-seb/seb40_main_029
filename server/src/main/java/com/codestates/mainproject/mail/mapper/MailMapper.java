package com.codestates.mainproject.mail.mapper;

import com.codestates.mainproject.mail.dto.MailPostDto;
import com.codestates.mainproject.mail.dto.MailResponseDto;
import com.codestates.mainproject.mail.entity.Mail;
import com.codestates.mainproject.member.dto.MemberResponseDto;
import com.codestates.mainproject.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")

public interface MailMapper {

    Mail MailPostDtoToMail(MailPostDto MailPostDto);

    MailResponseDto memberToMemberResponseDto(Member member);

    List<MemberResponseDto> membersToMemberResponseDtos(List<Member> members);
}
