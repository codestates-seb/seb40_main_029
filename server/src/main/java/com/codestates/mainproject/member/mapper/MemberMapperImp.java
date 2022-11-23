package com.codestates.mainproject.member.mapper;

import com.codestates.mainproject.member.dto.MemberPatchDto;
import com.codestates.mainproject.member.dto.MemberPostDto;
import com.codestates.mainproject.member.dto.MemberResponseDto;
import com.codestates.mainproject.member.entity.Member;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MemberMapperImp {

    public Member memberPostDtoToMember(MemberPostDto memberPostDto) {
        Member member = new Member();
        member.setDisplayName(memberPostDto.getDisplayName());
        return member;
    }


    public Member memberPatchDtoToMember(MemberPatchDto memberPatchDto) {
        Member member = new Member();
        member.setDisplayName(memberPatchDto.getDisplayName());
        return member;
    }



    public MemberResponseDto memberToMemberResponseDto(Member member) {

        // DTO 생성할때 친구의 회원 닉네임만 가져오기 위해 List<String> friends를 생성하여 responseDto에 추가
        List<String> friends = new ArrayList<>();
        for(int i=0; i < member.getFriends().size(); i++){
            friends.add(member.getFriends().get(i).getRespondent().getDisplayName());
        }
        // 클라이언트에게 response되는 DTO 생성
        MemberResponseDto memberResponseDto = new MemberResponseDto(
                member.getMemberId(),
                member.getEmail(),
                member.getDisplayName(),
                member.getPalette(),
                member.getPoint(),
                member.getRole(),
                member.getPalettes(),
                friends
        );
        return memberResponseDto;
    }


    public List<MemberResponseDto> membersToMemberResponseDtos(List<Member> members) {
        List<MemberResponseDto> memberResponseDtos = new ArrayList<>();
        for(int i=0; i < members.size(); i++) {

            List<String> friends = new ArrayList<>();
            for (int j = 0; j < members.get(i).getFriends().size(); j++) {
                friends.add(members.get(i).getFriends().get(j).getRespondent().getDisplayName());
            }

            memberResponseDtos.add(new MemberResponseDto(
                    members.get(i).getMemberId(),
                    members.get(i).getEmail(),
                    members.get(i).getDisplayName(),
                    members.get(i).getPalette(),
                    members.get(i).getPoint(),
                    members.get(i).getRole(),
                    members.get(i).getPalettes(),
                    friends
            ));
        }
        return memberResponseDtos;
    }
}
