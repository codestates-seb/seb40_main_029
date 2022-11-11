package com.codestates.mainproject.member.service;

import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.member.repository.MemberRepository;
import com.codestates.mainproject.member.role.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Member createMember(Member member){
        if(verifyDisplayName(member.getDisplayName()).isPresent()){
            throw new RuntimeException("이미 존재하는 회원입니다.");
        }
        member.setRole(Role.USER);
        member.setPoint(0);
        return memberRepository.save(member);
    }

    public Member updateMember(Member member){
        Member updateMember = verifyMember(member.getMemberId());
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

    public Member verifyMember(Long memberId){
       return memberRepository.findById(memberId)
               .orElseThrow(() -> new RuntimeException("MEMBER NOT FOUND"));
    }

    private Optional<Member> verifyDisplayName(String displayName){
        return memberRepository.findByDisplayName(displayName);
    }
}
