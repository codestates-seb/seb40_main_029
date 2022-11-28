package com.codestates.mainproject.member.service;

import com.codestates.mainproject.exception.BusinessLogicException;
import com.codestates.mainproject.exception.ExceptionCode;
import com.codestates.mainproject.member.dto.FriendPostDto;
import com.codestates.mainproject.member.entity.Friend;
import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.member.repository.FriendRepository;
import com.codestates.mainproject.member.repository.MemberRepository;
import com.codestates.mainproject.member.role.Role;
import com.codestates.mainproject.palette.entity.MemberPalette;
import com.codestates.mainproject.palette.entity.MoodPalette;
import com.codestates.mainproject.palette.repository.MoodPaletteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
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
    private final FriendRepository friendRepository;


    /* Oauth 로그인 후 displayName 설정 */
    public Member createMember(Member member){

        Member findMember = verifyEmail(member.getEmail())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        findMember.setDisplayName(member.getDisplayName());

        return memberRepository.save(findMember);
    }

    /* 회원 생성 테스트 메서드 */
    public Member createMemberTest(Member member){
        if(verifyEmail(member.getEmail()).isPresent()){
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }

        String basicCode = "P001";
        MoodPalette basicPalette = moodPaletteRepository.findById("P001").orElseThrow(() -> new BusinessLogicException(ExceptionCode.PALETTE_NOT_FOUND));

        member.setPalette(basicPalette.getPaletteName());
        member.setRole(Role.USER);
        member.setPoint(500);
        member.getPalettes().add(new MemberPalette(basicPalette));

        return memberRepository.save(member);
    }


    /* 친구 추가 */
    public Friend addFriend(FriendPostDto friend){
        if(friendRepository.findByRespondent_DisplayNameAndRequester_DisplayName(
                                                    friend.getRespondentDisplayName(),
                                                    friend.getRequesterDisplayName()).isPresent()){
            throw new BusinessLogicException(ExceptionCode.FRIEND_EXISTS);
        }
        Member requester = verifyDisplayName(friend.getRequesterDisplayName()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Member respondent = verifyDisplayName(friend.getRespondentDisplayName()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Friend saveFriend = new Friend(requester, respondent);
        friendRepository.save(saveFriend);
        respondent.getFriends().add(saveFriend);
        memberRepository.save(respondent);
        return saveFriend;
    }

    /* DisplayName 변경 */
    public Member updateMember(Member member, Long memberId){
        Member updateMember = verifyMember(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        updateMember.setDisplayName(member.getDisplayName());
        return updateMember;
    }

    /* 팔레트 구매 */
    public Member buyMoodPalete(Long memberId, String paletteCode){

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        MoodPalette newPalette = moodPaletteRepository.findById(paletteCode).orElseThrow(() -> new BusinessLogicException(ExceptionCode.PALETTE_NOT_FOUND));


        switch (paletteCode){
            case "P002" : if (member.getPoint() - 1000 < 0){
                throw new BusinessLogicException(ExceptionCode.NOT_ENOUGH_POINT);
            }
            else member.setPoint(member.getPoint() - 1000);
            break;

            case "P003" : if (member.getPoint() - 500 < 0){
                throw new BusinessLogicException(ExceptionCode.NOT_ENOUGH_POINT);
            }
            else member.setPoint(member.getPoint() - 500);
            break;

            case "P004" : if (member.getPoint() - 1500 < 0){
                throw new BusinessLogicException(ExceptionCode.NOT_ENOUGH_POINT);
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

    /* 팔레트 변경 */
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


    /* 회원 조회 */
    public Member findMember(Long memberId){
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("MEMBER NOT FOUND"));
    }


    /* 전체 회원 조회 */
    public List<Member> findMembers(){
        List<Member> members = memberRepository.findAll();
        return members;
    }

    /* 친구 추가한 회원 조회 */
    public List<Friend> findFriends(Long memberId){
        List<Friend> friends = friendRepository.findAllByRequester_MemberId(memberId);
        return friends;
    }

    /* 회원 탈퇴 */
    public void deleteMember(Long memberId){
        memberRepository.deleteById(memberId);
    }

    /* 모든 회원 삭제 : 사용 X */
    public void deleteMembers(){
        memberRepository.deleteAll();
    }


    /* 친구 삭제 */
    public void deleteFriend(Long respondentId){
        friendRepository.deleteByRespondent_MemberId(respondentId);
    }

    /* 회원 확인(회원ID) */
    public Optional<Member> verifyMember(Long memberId){
       return memberRepository.findById(memberId);
    }

    /* 회원 확인(회원 displayName) */
    public Optional<Member> verifyDisplayName(String displayName){
        return memberRepository.findByDisplayName(displayName);
    }

    /* 회원 확인(회원 이메일) */
    public Optional<Member> verifyEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    /* 회원 포인트 조회(회원ID) */
    public long memberPoint(Long memberId){
        return memberRepository.findById(memberId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND))
                .getPoint();
    }

    /* 회원 포인트 조회(회원 displayName) */
    public long memberDisplayNamePoint(String displayName){
        return memberRepository.findByDisplayName(displayName).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND))
                .getPoint();
    }
}
