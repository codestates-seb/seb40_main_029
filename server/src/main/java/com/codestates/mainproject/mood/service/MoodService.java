package com.codestates.mainproject.mood.service;

import com.codestates.mainproject.exception.BusinessLogicException;
import com.codestates.mainproject.exception.ExceptionCode;
import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.member.repository.MemberRepository;
import com.codestates.mainproject.member.service.MemberService;
import com.codestates.mainproject.mood.entity.Mood;
import com.codestates.mainproject.mood.repository.MoodRepository;
import com.codestates.mainproject.palette.entity.MoodPaletteDetails;
import com.codestates.mainproject.palette.repository.MoodPaletteDetailsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MoodService {

    private final MoodRepository moodRepository;
    private final MemberRepository memberRepository;
    private final MoodPaletteDetailsRepository moodPaletteDetailsRepository;


    /* 무드 추가 */
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

    /* 더미 데이터에 멤버 추가 (테스트용 메서드) */
    public void dummyMember(String displayName){
        Member member = memberRepository.findByDisplayName(displayName)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        for(Long i = Long.valueOf(4); i<369; i++){
            Mood mood = moodRepository.findById(i).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MOOD_EXISTS));
            mood.setMember(member);
            moodRepository.save(mood);
        }
    }

    /* 더미 데이터에 무드 추가 (테스드용 메서드) */
    public void  dummyMood(Long moodId, String paletteCode, String moodCode){
        Mood mood = moodRepository.findById(moodId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        MoodPaletteDetails moodPaletteDetails = moodPaletteDetailsRepository.findByMoodCodeAndPaletteCode(moodCode, paletteCode).orElseThrow(() -> new BusinessLogicException(ExceptionCode.PALETTE_NOT_FOUND));
        mood.setPaletteCode(paletteCode);
        mood.setMoodCode(moodCode);
        mood.setMoodPaletteDetails(moodPaletteDetails);
        moodRepository.save(mood);
    }

    /* 무드 데이터 변경 */
    public Mood updateMood(Mood mood, String displayName, Long moodId){
        Member member = memberRepository.findByDisplayName(displayName)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Mood findMood = moodRepository.findByMoodIdAndMember_MemberId(moodId, member.getMemberId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MOOD_EXISTS));
        MoodPaletteDetails moodPaletteDetails = moodPaletteDetailsRepository.findByMoodCodeAndPaletteCode(mood.getMoodCode(), mood.getPaletteCode())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PALETTE_NOT_FOUND));
        findMood.setMoodCode(mood.getMoodCode());
        findMood.setPaletteCode(mood.getPaletteCode());
        findMood.setBody(mood.getBody());
        findMood.setMoodPaletteDetails(moodPaletteDetails);

        return moodRepository.save(findMood);
    }

    /* 오늘 무드 조회 */
    public Mood findMood(String displayName){
        LocalDateTime startDateTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(0, 0, 0));
        LocalDateTime endDateTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23, 59, 59));

        Member member = memberRepository.findByDisplayName(displayName)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        if (moodRepository.findByMember_MemberIdAndCreatedAtBetween(member.getMemberId(), startDateTime, endDateTime).isEmpty()){
            return null;
        } else {
            Mood findMood = moodRepository.findByMember_MemberIdAndCreatedAtBetween(member.getMemberId(), startDateTime, endDateTime)
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MOOD_EXISTS));
            if(moodPaletteDetailsRepository.findByMoodCodeAndPaletteCode(findMood.getMoodCode(), findMood.getPaletteCode()).isEmpty()){
                return findMood;
            }else {
                MoodPaletteDetails moodPaletteDetails = moodPaletteDetailsRepository.findByMoodCodeAndPaletteCode(findMood.getMoodCode(), findMood.getPaletteCode())
                        .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PALETTE_NOT_FOUND));
                findMood.setMoodPaletteDetails(moodPaletteDetails);
                return findMood;
            }
        }
    }

    /*전체 무드 조회 */
    public List<Mood> findMoods(String displayName){
        Member member = memberRepository.findByDisplayName(displayName)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        List<Mood> moods = moodRepository.findAllByMember_MemberId(member.getMemberId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MOOD_EXISTS));
        //Todo : 잘못된 코드라 수정 필요함.
//        MoodPaletteDetails moodPaletteDetails;
//        if(moods.size() == 0){
//            moodPaletteDetails = null;
//        } else {
//            moodPaletteDetails = moodPaletteDetailsRepository.findByMoodCodeAndPaletteCode(moods.get(moods.size()-1).getMoodCode(), moods.get(moods.size()-1).getPaletteCode())
//                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PALETTE_NOT_FOUND));
//        }
//        List<Mood> moodList = moods.stream()
//                .map(mood -> {
//                    mood.setMoodPaletteDetails(moodPaletteDetails);
//                    return mood;
//                })
//                .collect(Collectors.toList());
//
//        log.info(moodList.get(0).getCreatedAt().toString());

        return moods;
    }



    /* 한 주 무드 조회 */
    public List<Mood> findMoodsWeek(String displayName){
        Member member = memberRepository.findByDisplayName(displayName)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        LocalDateTime startDateTime = LocalDateTime.of(LocalDate.now().minusDays(7), LocalTime.of(0, 0, 0));
        LocalDateTime endDateTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23, 59, 59));

        List<Mood> moodsWeek = moodRepository.findAllByMember_MemberIdAndCreatedAtBetween(member.getMemberId(), startDateTime, endDateTime);
//
//        MoodPaletteDetails moodPaletteDetails;
//        if(moodsWeek.get(0) == null){
//            moodPaletteDetails = null;
//        } else {
//            moodPaletteDetails = moodPaletteDetailsRepository.findByMoodCodeAndPaletteCode(moodsWeek.get(moodsWeek.size()-1).getMoodCode(), moodsWeek.get(moodsWeek.size()-1).getPaletteCode())
//                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PALETTE_NOT_FOUND));
//        }
//
//        List<Mood> moodListWeek = moodsWeek.stream()
//                .map(mood -> {
//                    mood.setMoodPaletteDetails(moodPaletteDetails);
//                    return mood;
//                }).collect(Collectors.toList());

        return moodsWeek;
    }

    /*월별 무드 조회 */
    public List<Mood> findMoodsMonth(String displayName, int month){
        Member member = memberRepository.findByDisplayName(displayName)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        LocalDateTime startDateTime = startMonth(month);
        LocalDateTime endDateTime = endMonth(month);

        List<Mood> moodsMonth = moodRepository.findAllByMember_MemberIdAndCreatedAtBetween(member.getMemberId(), startDateTime, endDateTime);

//        MoodPaletteDetails moodPaletteDetails;
//        if(moodsMonth.get(0) == null){
//            moodPaletteDetails = null;
//        } else {
//            moodPaletteDetails = moodPaletteDetailsRepository.findByMoodCodeAndPaletteCode(moodsMonth.get(moodsMonth.size()-1).getMoodCode(), moodsMonth.get(moodsMonth.size()-1).getPaletteCode())
//                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PALETTE_NOT_FOUND));
//        }
//
//        List<Mood> moodListWeek = moodsMonth.stream()
//                .map(mood -> {
//                    mood.setMoodPaletteDetails(moodPaletteDetails);
//                    return mood;
//                }).collect(Collectors.toList());

        return moodsMonth;
    }

    /* 연별 무드 조회 */
    public List<Mood> findMoodsYear(String displayName, int year){
        Member member = memberRepository.findByDisplayName(displayName)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        LocalDateTime startDateTime = startYear(year);
        LocalDateTime endDateTime = endYear(year);

        List<Mood> moodsYear = moodRepository.findAllByMember_MemberIdAndCreatedAtBetween(member.getMemberId(), startDateTime, endDateTime);

//        MoodPaletteDetails moodPaletteDetails;
//        if(moodsYear.get(0) == null){
//            moodPaletteDetails = null;
//        } else {
//            moodPaletteDetails = moodPaletteDetailsRepository.findByMoodCodeAndPaletteCode(moodsYear.get(moodsYear.size()-1).getMoodCode(), moodsYear.get(moodsYear.size()-1).getPaletteCode())
//                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PALETTE_NOT_FOUND));
//        }
//
//        List<Mood> moodListWeek = moodsYear.stream()
//                .map(mood -> {
//                    mood.setMoodPaletteDetails(moodPaletteDetails);
//                    return mood;
//                }).collect(Collectors.toList());

        return moodsYear;
    }

    /* 무드 삭제 */
    public void deleteMood(Long memberId, Long moodId){
        moodRepository.deleteByMember_MemberIdAndMoodId(memberId, moodId);
    }

    /* 월별 초일 추출 */
    public static LocalDateTime startMonth(int month){
        LocalDateTime localDateTime = LocalDateTime.now();
        return localDateTime.withMonth(month).
                withDayOfMonth(1).
                withHour(0).
                withMinute(0);
    }

    /* 월별 말일 추출 */
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

    /* 연초 추출 */
    public static LocalDateTime startYear(int year) {
        LocalDateTime localDateTime = LocalDateTime.now();
        return localDateTime.withYear(year).withMonth(1).withDayOfMonth(1).withHour(0).withMinute(0);
    }

    /* 연말 추출 */
    public static LocalDateTime endYear(int year) {
        LocalDateTime localDateTime = LocalDateTime.now();
        return localDateTime.withYear(year).withMonth(12).withDayOfMonth(31).withHour(23).minusMinutes(59);
    }
}
