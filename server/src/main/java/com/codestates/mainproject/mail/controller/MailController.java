package com.codestates.mainproject.mail.controller;


import com.codestates.mainproject.mail.dto.MailPostDto;
import com.codestates.mainproject.mail.dto.MailResponseDto;
import com.codestates.mainproject.mail.entity.Mail;
import com.codestates.mainproject.mail.mapper.MailMapper;
import com.codestates.mainproject.mail.service.MailService;
import com.codestates.mainproject.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mails")
public class MailController {

    private final MailService mailService;
    private final MemberRepository memberRepository;
    private final MailMapper mapper;


    //TODO : 편지 전송
    @PostMapping
    public ResponseEntity<MailResponseDto> sendMail(@RequestBody MailPostDto postDto){
        MailResponseDto response = mapper.mailToMailResponseDto(mailService.write(postDto));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
