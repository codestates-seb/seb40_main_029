package com.codestates.mainproject.member.service;

import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.member.repository.MemberRepository;
import com.codestates.mainproject.member.role.Role;
import com.codestates.mainproject.palette.entity.MemberPalette;
import com.codestates.mainproject.palette.entity.MoodPalette;
import com.codestates.mainproject.palette.repository.MoodPaletteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
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
        MoodPalette teracota = moodPaletteRepository.findById("P002").orElseThrow(() -> new RuntimeException("팔레트 정보를 찾을 수 없습니다."));
        member.setPalette(basicPalette.getPaletteName());
        member.setRole(Role.USER);
        member.setPoint(500);
        member.getPalettes().add(new MemberPalette(basicPalette));
        member.getPalettes().add(new MemberPalette(teracota));
        log.info("{}", basicPalette);
        return memberRepository.save(member);
    }

    public Member updateMember(Member member, Long memberId){
        Member updateMember = verifyMember(memberId)
                .orElseThrow(() -> new RuntimeException("MEMBER NOT FOUND"));
        updateMember.setDisplayName(member.getDisplayName());
        return updateMember;
    }

    public Member buyMoodPalete(Long memberId, String paletteCode){

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("MEMBER NOT FOUND"));

        MoodPalette newPalette = moodPaletteRepository.findById(paletteCode).orElseThrow(() -> new RuntimeException("팔레트 정보를 찾을 수 없습니다."));
        log.info(newPalette.getPaletteName());
        log.info(newPalette.getPaletteCode());
        log.info("{}", newPalette);

        switch (paletteCode){
            case "P002" : if (member.getPoint() - 1000 < 0){
                throw new RuntimeException("포인트가 부족합니다.");
            }
            else member.setPoint(member.getPoint() - 1000);
            break;

            case "P003" : if (member.getPoint() - 500 < 0){
                throw new RuntimeException("포인트가 부족합니다.");
            }
            else member.setPoint(member.getPoint() - 500);
            break;

            case "P004" : if (member.getPoint() - 1500 < 0){
                throw new RuntimeException("포인트가 부족합니다.");
            }
            else member.setPoint(member.getPoint() - 1500);
            break;

            case "P005" : if (member.getPoint() - 500 < 0){
                throw new RuntimeException("포인트가 부족합니다.");
            }
            else member.setPoint(member.getPoint() - 500);
            break;

            default: throw new RuntimeException("팔레트 정보를 찾을 수 없습니다.");
        }

        member.getPalettes().add(new MemberPalette(newPalette));

        return memberRepository.save(member);
    }

    public Member selectPalette(Long memberId, String paletteCode){
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RuntimeException("MEMBER NOT FOUND"));
        MoodPalette palette = moodPaletteRepository.findById(paletteCode).orElseThrow(() -> new RuntimeException("팔레트 정보를 찾을 수 없습니다."));

        for(int i=0; i < member.getPalettes().size(); i++){
            if(member.getPalettes().get(i).getMoodPalette().getPaletteCode().equals(paletteCode)){
                member.setPalette(palette.getPaletteName());
                return memberRepository.save(member);
            } else continue;
        }
        throw new RuntimeException("팔레트가 존재하지 않습니다.");
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
