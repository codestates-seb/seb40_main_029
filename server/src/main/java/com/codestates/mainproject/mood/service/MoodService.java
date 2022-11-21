package com.codestates.mainproject.mood.service;

import com.codestates.mainproject.exception.BusinessLogicException;
import com.codestates.mainproject.exception.ExceptionCode;
import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.member.repository.MemberRepository;
import com.codestates.mainproject.mood.entity.Mood;
import com.codestates.mainproject.mood.repository.MoodRepository;
import com.codestates.mainproject.palette.entity.MoodPaletteDetails;
import com.codestates.mainproject.palette.repository.MoodPaletteDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
        LocalDateTime startDateTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(0, 0, 0));
        LocalDateTime endDateTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23, 59, 59));

        Member member = memberRepository.findByDisplayName(displayName)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        if (moodRepository.findByMember_MemberIdAndCreatedAtBetween(member.getMemberId(), startDateTime, endDateTime).isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MOOD_EXISTS);
        }
        MoodPaletteDetails moodPaletteDetails = moodPaletteDetailsRepository.findByMoodCodeAndPaletteCode(mood.getMoodCode(), mood.getPaletteCode())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PALETTE_NOT_FOUND));

        if(mood.getBody() != null) {
            member.setPoint(member.getPoint() + 80);
        }
        else {
            member.setPoint(member.getPoint() + 50);
        }
        mood.setMember(member);
        mood.setMoodPaletteDetails(moodPaletteDetails);

        return moodRepository.save(mood);
    }

    public Mood updateMood(Mood mood, String displayName, Long moodId){
        Member member = memberRepository.findByDisplayName(displayName)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Mood findMood = moodRepository.findByMoodIdAndMember_MemberId(moodId, member.getMemberId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MOOD_EXISTS));
        findMood.setMoodCode(mood.getMoodCode());
        findMood.setPaletteCode(mood.getPaletteCode());
        findMood.setBody(mood.getBody());

        return moodRepository.save(findMood);
    }

    public Mood findMood(String displayName){
        LocalDateTime startDateTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(0, 0, 0));
        LocalDateTime endDateTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23, 59, 59));

        Member member = memberRepository.findByDisplayName(displayName)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Mood findMood = moodRepository.findByMember_MemberIdAndCreatedAtBetween(member.getMemberId(), startDateTime, endDateTime)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MOOD_EXISTS));
        MoodPaletteDetails moodPaletteDetails = moodPaletteDetailsRepository.findByMoodCodeAndPaletteCode(findMood.getMoodCode(), findMood.getPaletteCode())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PALETTE_NOT_FOUND));
        findMood.setMoodPaletteDetails(moodPaletteDetails);

        return findMood;
    }

    public List<Mood> findMoods(String displayName){
        Member member = memberRepository.findByDisplayName(displayName)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        List<Mood> moods = moodRepository.findAllByMember_MemberId(member.getMemberId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MOOD_EXISTS));
        MoodPaletteDetails moodPaletteDetails = moodPaletteDetailsRepository.findByMoodCodeAndPaletteCode(moods.get(moods.size()-1).getMoodCode(), moods.get(moods.size()-1).getPaletteCode())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PALETTE_NOT_FOUND));

        List<Mood> moodList = moods.stream()
                .map(mood -> {
                    mood.setMoodPaletteDetails(moodPaletteDetails);
                    return mood;
                })
                .collect(Collectors.toList());

        return moodList;
    }

    public List<Mood> findMoodsWeek(String displayName){
        Member member = memberRepository.findByDisplayName(displayName)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        LocalDateTime startDateTime = LocalDateTime.of(LocalDate.now().minusDays(7), LocalTime.of(0, 0, 0));
        LocalDateTime endDateTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23, 59, 59));

        List<Mood> moodsWeek = moodRepository.findAllByMember_MemberIdAndCreatedAtBetween(member.getMemberId(), startDateTime, endDateTime);

        MoodPaletteDetails moodPaletteDetails = moodPaletteDetailsRepository.findByMoodCodeAndPaletteCode(moodsWeek.get(moodsWeek.size()-1).getMoodCode(), moodsWeek.get(moodsWeek.size()-1).getPaletteCode())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PALETTE_NOT_FOUND));

        List<Mood> moodListWeek = moodsWeek.stream()
                .map(mood -> {
                    mood.setMoodPaletteDetails(moodPaletteDetails);
                    return mood;
                }).collect(Collectors.toList());

        return moodListWeek;
    }

    public List<Mood> findMoodsMonth(String displayName, int month){
        Member member = memberRepository.findByDisplayName(displayName)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        LocalDateTime startDateTime = startMonth(month);
        LocalDateTime endDateTime = endMonth(month);

        List<Mood> moodsWeek = moodRepository.findAllByMember_MemberIdAndCreatedAtBetween(member.getMemberId(), startDateTime, endDateTime);

        MoodPaletteDetails moodPaletteDetails = moodPaletteDetailsRepository.findByMoodCodeAndPaletteCode(moodsWeek.get(moodsWeek.size()-1).getMoodCode(), moodsWeek.get(moodsWeek.size()-1).getPaletteCode())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PALETTE_NOT_FOUND));

        List<Mood> moodListWeek = moodsWeek.stream()
                .map(mood -> {
                    mood.setMoodPaletteDetails(moodPaletteDetails);
                    return mood;
                }).collect(Collectors.toList());

        return moodListWeek;
    }

    public List<Mood> findMoodsYear(String displayName, int year){
        Member member = memberRepository.findByDisplayName(displayName)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        LocalDateTime startDateTime = startYear(year);
        LocalDateTime endDateTime = endYear(year);

        List<Mood> moodsWeek = moodRepository.findAllByMember_MemberIdAndCreatedAtBetween(member.getMemberId(), startDateTime, endDateTime);

        MoodPaletteDetails moodPaletteDetails = moodPaletteDetailsRepository.findByMoodCodeAndPaletteCode(moodsWeek.get(moodsWeek.size()-1).getMoodCode(), moodsWeek.get(moodsWeek.size()-1).getPaletteCode())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PALETTE_NOT_FOUND));

        List<Mood> moodListWeek = moodsWeek.stream()
                .map(mood -> {
                    mood.setMoodPaletteDetails(moodPaletteDetails);
                    return mood;
                }).collect(Collectors.toList());

        return moodListWeek;
    }

    public void deleteMood(Long memberId, Long moodId){
        moodRepository.deleteByMember_MemberIdAndMoodId(memberId, moodId);
    }

    public static LocalDateTime startMonth(int month){
        LocalDateTime localDateTime = LocalDateTime.now();
        return localDateTime.withMonth(month).
                withDayOfMonth(1).
                withHour(0).
                withMinute(0);
    }

    public static LocalDateTime endMonth(int month){
        LocalDateTime localDateTime = LocalDateTime.now();
        int day=0;
        switch (month){
            case 2 : day = 28;
                break;
            case 4 : day = 30;
                break;
            case 6 : day = 30;
                break;
            case 9 : day = 30;
                break;
            case 11 : day = 30;
                break;
            default: day = 31;
                break;
        }

        return localDateTime.withMonth(month).
                withDayOfMonth(day).
                withHour(23).
                withMinute(59);
    }

    public static LocalDateTime startYear(int year) {
        LocalDateTime localDateTime = LocalDateTime.now();
        return localDateTime.withYear(2021).withMonth(1).withDayOfMonth(1).withHour(0).withMinute(0);
    }

    public static LocalDateTime endYear(int year) {
        LocalDateTime localDateTime = LocalDateTime.now();
        return localDateTime.withYear(2021).withMonth(12).withDayOfMonth(31).withHour(23).minusMinutes(59);
    }
}
