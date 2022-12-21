package com.codestates.mainproject.mail.controller;


import com.codestates.mainproject.dto.MultiResponseDto;
import com.codestates.mainproject.mail.dto.MailPostDto;
import com.codestates.mainproject.mail.dto.MailResponseDto;
import com.codestates.mainproject.mail.entity.Mail;
import com.codestates.mainproject.mail.mapper.MailMapeerImpl;
import com.codestates.mainproject.mail.service.MailService;
import com.codestates.mainproject.member.repository.MemberRepository;
import com.codestates.mainproject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/mails")
public class MailController {

    private final MailService mailService;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final MailMapeerImpl mapper;


    //TODO : 편지 전송
    @PostMapping
    public ResponseEntity sendMail(@RequestBody MailPostDto postDto){
        Mail message = mailService.write(postDto);
        MailResponseDto response = mapper.mailToMailResponseDto(message);
        long point = memberService.memberDisplayNamePoint(postDto.getSenderName());
        log.info(postDto.getSenderName() + "님이 " + postDto.getReceiverName() + "님에게 편지를 작성했습니다.");

        return new ResponseEntity<>(new MultiResponseDto<>(response, point), HttpStatus.OK);
    }

    @PatchMapping("/dummy/{sender-id}/{receiver-id}")
    public void mailDummy(@PathVariable("sender-id") Long senderId,
                          @PathVariable("receiver-id") Long receiverId){
        mailService.dummyMail(senderId, receiverId);
    }

    @PatchMapping("/dummy/{mail-id}")
    public void mailOneDummy(@PathVariable("mail-id") Long mailId,
                          @RequestBody MailPostDto dto){

        mailService.dummyOneMail(dto, mailId);
    }



    @PatchMapping("/{member-id}")
    public ResponseEntity<List<Mail>> convertMail(@PathVariable("member-id") Long memberId) {
        List<Mail> convert = mailService.convert(memberId);
        return new ResponseEntity<>(convert, HttpStatus.OK);
    }

    // 메일 조회 기능
    @GetMapping("/{member-id}/{mail-id}") // 사용자로부터 받는 파라미터 URI 주소
    public ResponseEntity<MailResponseDto> findMail(@PathVariable("mail-id") Long mailId){
        Mail message = mailService.findMessage(mailId); // mailId를 식별자로 해서 DB에서 데이터를 가져온다.
        log.info("{}", message);
        MailResponseDto response = mapper.mailToMailResponseDto(message);
        log.info("메일 조회에 성공하였습니다.");
        return new ResponseEntity<>(response, HttpStatus.OK); // ResponseEntity 객체를 생성해서 response를 반환해준다.
    }

    // 메일함 조회 기능
    @GetMapping("/{member-id}")
    public ResponseEntity<List<MailResponseDto>> findMails(@PathVariable("member-id") Long memberId){
        List<Mail> messages = mailService.findMessages(memberId);
        List<MailResponseDto> response = messages.stream()
                .map(mail -> mapper.mailToMailResponseDto(mail))
                .collect(Collectors.toList());

        log.info("우편함 조회에 성공하였습니다.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{member-id}/{mail-id}")
    public ResponseEntity<MailResponseDto> verifyMail(@PathVariable("mail-id") Long mailId){
        Mail mail = mailService.verifyMessage(mailId);
        MailResponseDto response = mapper.mailToMailResponseDto(mail);

        log.info("메일을 확인하였습니다.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}/{mail-id}")
    public void deleteMail(@PathVariable("mail-id") Long mailId){
        mailService.deleteMessage(mailId);
    }

    @DeleteMapping("/{member-id}")
    public void deleteMails(@PathVariable("member-id") Long memberId){
        mailService.deleteMessages(memberId);
    }
}


