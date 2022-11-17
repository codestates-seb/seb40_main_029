package com.codestates.mainproject.mail.service;

import com.codestates.mainproject.mail.dto.MailPostDto;
import com.codestates.mainproject.mail.entity.Mail;
import com.codestates.mainproject.mail.repository.MailRepository;
import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MailService {

    private final MailRepository mailRepository;
    private final MemberRepository memberRepository;

    //메일 전송 기능.
    public Mail write(MailPostDto postDto){
        Member receiver = verifyMember(postDto.getReceiverName());

        Member sender = verifyMember(postDto.getSenderName());

        if (sender.getPoint() -60 < 0){
            throw new RuntimeException("포인트가 부족합니다.");
        }

        Mail message = new Mail();
        message.setReceiver(receiver);
        message.setSender(sender);

        message.setBody(postDto.getBody());
        message.setVerifyMail(false);
        System.out.println(message.isVerifyMail());

        sender.setPoint(sender.getPoint() - 60);

        return mailRepository.save(message);
    }

    public Mail findMessage(Long mailId){
        return mailRepository.findById(mailId)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 메일입니다"));
    }

    public List<Mail> findMessages(Long memberId){
        return mailRepository.findAllByReceiverMemberId(memberId);
    }

    public Mail verifyMessage(Long mailId){
        Mail mail = mailRepository.findById(mailId)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 메일입니다."));

        mail.setVerifyMail(true);
        return mailRepository.save(mail);
    }

    public void deleteMessage(Long mailId){
        mailRepository.deleteById(mailId);
    }

    public void deleteMessages(Long memberId){
        mailRepository.deleteAllByReceiver_MemberId(memberId);
    }


    public Member verifyMember(String displayName){
        return memberRepository.findByDisplayName(displayName)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
    }
}
