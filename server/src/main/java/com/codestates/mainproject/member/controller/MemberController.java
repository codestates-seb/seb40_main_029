package com.codestates.mainproject.member.controller;

import com.codestates.mainproject.member.dto.MemberPatchDto;
import com.codestates.mainproject.member.dto.MemberPostDto;
import com.codestates.mainproject.member.dto.MemberResponseDto;
import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.member.mapper.MemberMapper;
import com.codestates.mainproject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")
@Slf4j
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    @PostMapping
    public ResponseEntity<MemberResponseDto> postMember(@RequestBody MemberPostDto postDto){
        Member member = mapper.memberPostDtoToMember(postDto);
        Member saveMember = memberService.createMember(member);
        MemberResponseDto respponse = mapper.memberToMemberResponseDto(saveMember);

        return new ResponseEntity<>(respponse, HttpStatus.OK);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity<MemberResponseDto> patchMember(@RequestBody MemberPatchDto patchDto,
                                                         @PathVariable("member-id") Long memberId){
        Member member = mapper.memberPatchDtoToMember(patchDto);
        Member updateMember = memberService.updateMember(member, memberId);
        MemberResponseDto response = mapper.memberToMemberResponseDto(updateMember);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/buy/{member-id}/{palette-code}")
    public ResponseEntity<MemberResponseDto> buyPalette(@PathVariable("member-id") Long memberId,
                                                        @PathVariable("palette-code") String paletteCode){
        Member saveMember = memberService.buyMoodPalete(memberId, paletteCode);
        MemberResponseDto response = mapper.memberToMemberResponseDto(saveMember);


        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/choice/{member-id}/{palette-code}")
    public ResponseEntity<MemberResponseDto> choicePalette(@PathVariable("member-id") Long memberId,
                                                           @PathVariable("palette-code") String paletteCode){
        Member member = memberService.selectPalette(memberId, paletteCode);
        MemberResponseDto response = mapper.memberToMemberResponseDto(member);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity<MemberResponseDto> getMember(@PathVariable("member-id") Long memberId){
        Member member = memberService.findMember(memberId);
        MemberResponseDto response = mapper.memberToMemberResponseDto(member);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    @GetMapping("/")

    @GetMapping
    public ResponseEntity<List<MemberResponseDto>> getMembers(){
        List<Member> members = memberService.findMembers();
        List<MemberResponseDto> response = mapper.membersToMemberResponseDtos(members);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @DeleteMapping("/{member-id}")
    public ResponseEntity<?> deleteMember(@PathVariable("member-id") Long memberId){
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
