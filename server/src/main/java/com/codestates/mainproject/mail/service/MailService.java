package com.codestates.mainproject.mail.service;

import com.codestates.mainproject.mail.dto.MailPostDto;
import com.codestates.mainproject.mail.entity.Mail;
import com.codestates.mainproject.mail.repository.MailRepository;
import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MailService {

    private final MailRepository mailRepository;
    private final MemberRepository memberRepository;

    public Mail write(MailPostDto postDto){
        long mailPoint = 50;
        Member receiver = verifyMember(postDto.getRaceiverName());

        Member sender = verifyMember(postDto.getSenderName());

        Mail message = new Mail();
        message.setReceiver(receiver);
        message.setSender(sender);

        message.setBody(postDto.getBody());
        message.setVerify(false);

        sender.setPoint(sender.getPoint() - mailPoint);

        return mailRepository.save(message);
    }


    public Member verifyMember(String displayName){
        return memberRepository.findByDisplayName(displayName)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
    }
}
