package com.codestates.mainproject.member.controller;

import com.codestates.mainproject.auth.TokenResponse;
import com.codestates.mainproject.auth.jwt.JwtProvider;
import com.codestates.mainproject.auth.jwt.MemberDetails;
import com.codestates.mainproject.dto.MultiResponseDto;
import com.codestates.mainproject.dto.SingleResponseDto;
import com.codestates.mainproject.exception.BusinessLogicException;
import com.codestates.mainproject.exception.ExceptionCode;
import com.codestates.mainproject.member.dto.*;
//import com.codestates.mainproject.member.entity.Friend;
import com.codestates.mainproject.member.entity.Friend;
import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.member.mapper.FriendMapper;
import com.codestates.mainproject.member.mapper.MemberMapper;
import com.codestates.mainproject.member.service.MemberService;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/members")
@Slf4j
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final FriendMapper friendMapper;
    private final MemberMapper mapper;
    private final JwtProvider jwtProvider;

    @Transactional
    @GetMapping("/logout")
    public ResponseEntity logout(@AuthenticationPrincipal MemberDetails memberDetails,
                                 @RequestHeader("Authorization") String bearerAtk) throws JwtException {
        Member member = memberDetails.getMember();

        jwtProvider.setBlackListAtk(bearerAtk);
        jwtProvider.deleteRtk(member);

        return new ResponseEntity<>(new SingleResponseDto<>("???????????? ???????????????."), HttpStatus.OK);
    }

    @Transactional
    @GetMapping("/reissue")
    public ResponseEntity reissue(@RequestHeader("Refresh") String refreshToken) throws Exception {
        String memberEmail = jwtProvider.getClaims(refreshToken).getBody().getSubject();
        log.info(memberEmail);
        Member member = memberService.verifyEmail(memberEmail)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        TokenResponse tokenResponse = jwtProvider.reissueAtk(member);

        Map<String, Object> claims = jwtProvider.getClaims(tokenResponse.getAccessToken()).getBody();
        long memberId = Long.parseLong(claims.get("memberId").toString());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + tokenResponse.getAccessToken());

        return new ResponseEntity<>(new SingleResponseDto<>("memberId : " + memberId), headers, HttpStatus.OK);
    }


    // 1. ???????????????????????? MemberPostDto ???????????? ???????????? ?????????.
    // 2. Service?????? ????????? ???????????? ????????? Member ???????????? ????????? mapper??? MemberPostDto -> Member ???????????? ?????????.
    // 3. Service ???????????? createdMember ???????????? ???????????? member ????????? DB??? ????????????.
    @PatchMapping("/addMember")
    public ResponseEntity addMember(@RequestBody MemberPostDto postDto){
        Member member = mapper.memberPostDtoToMember(postDto);// postDto??? ???????????????????????? ????????? ????????? ????????? ?????? ?????????

            Member saveMember = memberService.createMember(member);
            log.info(saveMember.getDisplayName() + "?????? ?????? ???????????????.");
            MemberResponseDto response = mapper.memberToMemberResponseDto(saveMember);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    @PostMapping("/addMember")
    public ResponseEntity<MemberResponseDto> postMember(@RequestBody MemberPostDto postDto){
        Member member = mapper.memberPostDtoToMember(postDto);// postDto??? ???????????????????????? ????????? ????????? ????????? ?????? ?????????
        Member saveMember = memberService.createMemberTest(member);
        log.info(saveMember.getDisplayName() + "?????? ?????? ???????????????.");
        MemberResponseDto respponse = mapper.memberToMemberResponseDto(saveMember);

        return new ResponseEntity<>(respponse, HttpStatus.CREATED);
    }

    @PostMapping("/addFriend")
    public ResponseEntity<FriendResponseDto> postFriend(@RequestBody FriendPostDto postDto){

        Friend saveFriend = memberService.addFriend(postDto);
        log.info(saveFriend.getRespondent().getDisplayName() + "?????? ????????? ???????????????.");
        FriendResponseDto response = friendMapper.friendToFriendResponseDto(saveFriend);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity<MemberResponseDto> patchMember(@RequestBody MemberPatchDto patchDto,
                                                         @PathVariable("member-id") Long memberId){
        Member member = mapper.memberPatchDtoToMember(patchDto);
        Member updateMember = memberService.updateMember(member, memberId);
        log.info(updateMember.getDisplayName() + "?????? ???????????? ?????????????????????.");
        MemberResponseDto response = mapper.memberToMemberResponseDto(updateMember);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/buy/{member-id}/{palette-code}")
    public ResponseEntity buyPalette(@PathVariable("member-id") Long memberId,
                                                        @PathVariable("palette-code") String paletteCode){
        Member saveMember = memberService.buyMoodPalete(memberId, paletteCode);
        MemberResponseDto response = mapper.memberToMemberResponseDto(saveMember);
        long point = memberService.memberPoint(memberId);
        log.info("????????? ????????? ?????????????????????.");

        return new ResponseEntity<>(new MultiResponseDto<>(response, point), HttpStatus.OK);
    }

    @PatchMapping("/choice/{member-id}/{palette-code}")
    public ResponseEntity<MemberResponseDto> choicePalette(@PathVariable("member-id") Long memberId,
                                                           @PathVariable("palette-code") String paletteCode){
        Member member = memberService.selectPalette(memberId, paletteCode);
        MemberResponseDto response = mapper.memberToMemberResponseDto(member);
        log.info(response.getPalette() + " ???????????? ?????????????????????.");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/point/{member-id}")
    public void patchPoint(@PathVariable("member-id") Long memberId){
        memberService.setPointMember(memberId);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity<MemberResponseDto> getMember(@PathVariable("member-id") Long memberId){
        Member member = memberService.findMember(memberId);
        MemberResponseDto response = mapper.memberToMemberResponseDto(member);
        log.info("?????? ????????? ?????????????????????.");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/friend/{member-id}")
    public ResponseEntity<List<FriendResponseDto>> getFriend(@PathVariable("member-id") Long memberId){
        List<Friend> friends = memberService.findFriends(memberId);
        List<FriendResponseDto> response = friendMapper.friendsToFridndResponseDtos(friends);
        log.info("?????? Mood ?????? ????????? ?????????????????????.");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    @GetMapping("/")

    @GetMapping
    public ResponseEntity<List<MemberResponseDto>> getMembers(){
        List<Member> members = memberService.findMembers();
        List<MemberResponseDto> response = mapper.membersToMemberResponseDtos(members);
        log.info("?????? ????????? ????????? ?????????????????????.");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @DeleteMapping("/{member-id}")
    public void deleteMember(@PathVariable("member-id") Long memberId){
        memberService.deleteMember(memberId);
        log.info("?????? ?????????????????????.");
    }

    @DeleteMapping("/friend/{friend-id}")
    public void deleteFriend(@PathVariable("friend-id") Long friendId){
        memberService.deleteFriend(friendId);
        log.info("???????????? ?????????????????????.");
    }
}
