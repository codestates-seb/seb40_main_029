package com.codestates.mainproject.member.service;

import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.member.repository.MemberRepository;
import com.codestates.mainproject.member.role.Role;
import com.codestates.mainproject.palette.entity.MemberPalette;
import com.codestates.mainproject.palette.entity.MoodPalette;
import com.codestates.mainproject.palette.repository.MoodPaletteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final MoodPaletteRepository moodPaletteRepository;


    public Member createMember(Member member){
        if(verifyDisplayName(member.getDisplayName()).isPresent()){
            throw new RuntimeException("이미 존재하는 회원입니다.");
        }
        String basicCode = "P001";
        MoodPalette basicPalette = moodPaletteRepository.findById("P001").orElseThrow(() -> new RuntimeException("팔레트 정보를 찾을 수 없습니다."));
        member.setPalette(basicPalette.getPaletteName());
        member.getPalettes();
        member.setRole(Role.USER);
        member.setPoint(0);
        member.getPalettes().add(new MemberPalette(basicPalette));
        return memberRepository.save(member);
    }

    public Member updateMember(Member member){
        Member updateMember = verifyMember(member.getMemberId())
                .orElseThrow(() -> new RuntimeException("MEMBER NOT FOUND"));
        updateMember.setDisplayName(member.getDisplayName());
        return updateMember;
    }

    public Member findMember(Long memberId){
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("MEMBER NOT FOUND"));
    }

    public List<Member> findMembers(){
        List<Member> members = memberRepository.findAll();
        return members;
    }

    public void deleteMember(Long memberId){
        memberRepository.deleteById(memberId);
    }

    public void deleteMembers(){
        memberRepository.deleteAll();
    }

    public Optional<Member> verifyMember(Long memberId){
       return memberRepository.findById(memberId);
    }

    private Optional<Member> verifyDisplayName(String displayName){
        return memberRepository.findByDisplayName(displayName);
    }

}
