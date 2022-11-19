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
        MemberResponseDto respponse = mapper.memberToMemberResponseDto(saveMember);

        return new ResponseEntity<>(respponse, HttpStatus.OK);
    }
    @PostMapping("/addFriend")
    public ResponseEntity<FriendResponseDto> postFriend(@RequestBody FriendPostDto postDto){

        Friend saveFriend = memberService.addFriend(postDto);
        FriendResponseDto response = friendMapper.friendToFriendResponseDto(saveFriend);

        return new ResponseEntity<>(response, HttpStatus.OK);
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

    @GetMapping("/friend/{member-id}")
    public ResponseEntity<List<FriendResponseDto>> getFriend(@PathVariable("member-id") Long memberId){
        List<Friend> friends = memberService.findFriends(memberId);
        List<FriendResponseDto> response = friendMapper.friendsToFridndResponseDtos(friends);

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

    @DeleteMapping("/friend/{friend-id}")
    public ResponseEntity<?> deleteFriend(@PathVariable("friend-id") Long friendId){
        memberService.deleteFriend(friendId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
