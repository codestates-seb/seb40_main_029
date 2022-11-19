package com.codestates.mainproject.member.controller;

import com.codestates.mainproject.member.dto.*;
//import com.codestates.mainproject.member.entity.Friend;
import com.codestates.mainproject.member.entity.Friend;
import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.member.mapper.FriendMapper;
import com.codestates.mainproject.member.mapper.MemberMapperImp;
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
    private final FriendMapper friendMapper;
    private final MemberMapperImp mapper;

    
    @PostMapping("/addMember")
    public ResponseEntity<MemberResponseDto> postMember(@RequestBody MemberPostDto postDto){
        Member member = mapper.memberPostDtoToMember(postDto);
        Member saveMember = memberService.createMember(member);
        log.info(saveMember.getDisplayName() + "님이 가입 하였습니다.");
        MemberResponseDto respponse = mapper.memberToMemberResponseDto(saveMember);

        return new ResponseEntity<>(respponse, HttpStatus.OK);
    }
    @PostMapping("/addFriend")
    public ResponseEntity<FriendResponseDto> postFriend(@RequestBody FriendPostDto postDto){

        Friend saveFriend = memberService.addFriend(postDto);
        log.info(saveFriend.getRespondent().getDisplayName() + "님을 팔로잉 하였습니다.");
        FriendResponseDto response = friendMapper.friendToFriendResponseDto(saveFriend);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity<MemberResponseDto> patchMember(@RequestBody MemberPatchDto patchDto,
                                                         @PathVariable("member-id") Long memberId){
        Member member = mapper.memberPatchDtoToMember(patchDto);
        Member updateMember = memberService.updateMember(member, memberId);
        log.info(updateMember.getDisplayName() + "으로 닉네임을 변경하였습니다.");
        MemberResponseDto response = mapper.memberToMemberResponseDto(updateMember);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/buy/{member-id}/{palette-code}")
    public ResponseEntity<MemberResponseDto> buyPalette(@PathVariable("member-id") Long memberId,
                                                        @PathVariable("palette-code") String paletteCode){
        Member saveMember = memberService.buyMoodPalete(memberId, paletteCode);
        MemberResponseDto response = mapper.memberToMemberResponseDto(saveMember);
        log.info("팔레트 구매에 성공하였습니다.");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/choice/{member-id}/{palette-code}")
    public ResponseEntity<MemberResponseDto> choicePalette(@PathVariable("member-id") Long memberId,
                                                           @PathVariable("palette-code") String paletteCode){
        Member member = memberService.selectPalette(memberId, paletteCode);
        MemberResponseDto response = mapper.memberToMemberResponseDto(member);
        log.info(response.getPalette() + " 팔레트를 선택하였습니다.");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity<MemberResponseDto> getMember(@PathVariable("member-id") Long memberId){
        Member member = memberService.findMember(memberId);
        MemberResponseDto response = mapper.memberToMemberResponseDto(member);
        log.info("회원 조회에 성공하였습니다.");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/friend/{member-id}")
    public ResponseEntity<List<FriendResponseDto>> getFriend(@PathVariable("member-id") Long memberId){
        List<Friend> friends = memberService.findFriends(memberId);
        List<FriendResponseDto> response = friendMapper.friendsToFridndResponseDtos(friends);
        log.info("친구 Mood 정보 조회에 성공하였습니다.");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    @GetMapping("/")

    @GetMapping
    public ResponseEntity<List<MemberResponseDto>> getMembers(){
        List<Member> members = memberService.findMembers();
        List<MemberResponseDto> response = mapper.membersToMemberResponseDtos(members);
        log.info("회원 리스트 조회에 성공하였습니다.");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @DeleteMapping("/{member-id}")
    public ResponseEntity<?> deleteMember(@PathVariable("member-id") Long memberId){
        memberService.deleteMember(memberId);
        log.info("회원 탈퇴되었습니다.");

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/friend/{friend-id}")
    public ResponseEntity<?> deleteFriend(@PathVariable("friend-id") Long friendId){
        memberService.deleteFriend(friendId);
        log.info("팔로우를 취소하였습니다.");

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
