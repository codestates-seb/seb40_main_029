package com.codestates.mainproject.mail.service;

import com.codestates.mainproject.exception.BusinessLogicException;
import com.codestates.mainproject.exception.ExceptionCode;
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
            throw new BusinessLogicException(ExceptionCode.NOT_ENOUGH_POINT);
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
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MAIL_EXISTS));
    }

    public List<Mail> findMessages(Long memberId){
        return mailRepository.findAllByReceiverMemberId(memberId);
    }

    public Mail verifyMessage(Long mailId){
        Mail mail = mailRepository.findById(mailId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MAIL_EXISTS));

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
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }
}
