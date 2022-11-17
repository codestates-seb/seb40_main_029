package com.codestates.mainproject.mood.service;

import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.member.repository.MemberRepository;
import com.codestates.mainproject.mood.entity.Mood;
import com.codestates.mainproject.mood.repository.MoodRepository;
import com.codestates.mainproject.palette.entity.MoodPaletteDetails;
import com.codestates.mainproject.palette.repository.MoodPaletteDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class MoodService {

    private final MoodRepository moodRepository;
    private final MemberRepository memberRepository;
    private final MoodPaletteDetailsRepository moodPaletteDetailsRepository;

    public Mood createdMood(Mood mood, String displayName){
        Member member = memberRepository.findByDisplayName(displayName)
                .orElseThrow(() -> new RuntimeException("MEMBER NOT FOUND"));
        MoodPaletteDetails moodPaletteDetails = moodPaletteDetailsRepository.findByMoodCodeAndPaletteCode(mood.getMoodCode(), mood.getPaletteCode())
                .orElseThrow(() -> new RuntimeException("다시 입력해주세요"));
        member.setPoint(member.getPoint() + 50);
        mood.setMember(member);
        mood.setMoodPaletteDetails(moodPaletteDetails);

        return moodRepository.save(mood);
    }

    public Mood updateMood(Mood mood, String displayName, Long moodId){
        Member member = memberRepository.findByDisplayName(displayName)
                .orElseThrow(() -> new RuntimeException("MEMBER_NOT_FOUND"));
        Mood findMood = moodRepository.findByMoodIdAndMember_MemberId(moodId, member.getMemberId())
                .orElseThrow(() -> new RuntimeException("다시 입력해주세요"));
        findMood.setMoodCode(mood.getMoodCode());
        findMood.setPaletteCode(mood.getPaletteCode());
        findMood.setBody(mood.getBody());

        return moodRepository.save(findMood);
    }

    public Mood findMood(String displayName, Long moodId){
        Member member = memberRepository.findByDisplayName(displayName)
                .orElseThrow(() -> new RuntimeException("MEMBER_NOT_FOUND"));
        Mood findMood = moodRepository.findByMoodIdAndMember_MemberId(moodId, member.getMemberId())
                .orElseThrow(() -> new RuntimeException("다시 입력해주세요"));
        MoodPaletteDetails moodPaletteDetails = moodPaletteDetailsRepository.findByMoodCodeAndPaletteCode(findMood.getMoodCode(), findMood.getPaletteCode())
                .orElseThrow(() -> new RuntimeException("다시 입력해주세요"));
        findMood.setMoodPaletteDetails(moodPaletteDetails);

        return findMood;
    }

    public List<Mood> findMoods(String displayName){
        Member member = memberRepository.findByDisplayName(displayName)
                .orElseThrow(() -> new RuntimeException("MEMBER_NOT_FOUND"));
        List<Mood> moods = moodRepository.findAllByMember_MemberId(member.getMemberId())
                .orElseThrow(() -> new RuntimeException("등록된 데이터가 없습니다."));
        MoodPaletteDetails moodPaletteDetails = moodPaletteDetailsRepository.findByMoodCodeAndPaletteCode(moods.get(moods.size()-1).getMoodCode(), moods.get(moods.size()-1).getPaletteCode())
                .orElseThrow(() -> new RuntimeException("다시 입력해주세요"));

        List<Mood> moodList = moods.stream()
                .map(mood -> {
                    mood.setMoodPaletteDetails(moodPaletteDetails);
                    return mood;
                })
                .collect(Collectors.toList());

        return moodList;
    }

    public void deleteMood(Long memberId, Long moodId){
        moodRepository.deleteByMember_MemberIdAndMoodId(memberId, moodId);
    }
}
