package com.codestates.mainproject.mood.controller;

import com.codestates.mainproject.mood.dto.MoodPatchDto;
import com.codestates.mainproject.mood.dto.MoodPostDto;
import com.codestates.mainproject.mood.dto.MoodResponseDto;
import com.codestates.mainproject.mood.entity.Mood;
import com.codestates.mainproject.mood.mapper.MoodMapper;
import com.codestates.mainproject.mood.mapper.MoodMapperImp;
import com.codestates.mainproject.mood.service.MoodService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/mood")
@RequiredArgsConstructor
public class MoodController {

    private final MoodService moodService;
    private final MoodMapperImp mapper;

    @PostMapping("/{member-displayName}")
    public ResponseEntity<MoodResponseDto> postMood(@PathVariable("member-displayName") String memberDisplayName,
                                         @RequestBody MoodPostDto postDto){
        Mood mood = mapper.moodPostDtoToMood(postDto);
        Mood saveMood = moodService.createdMood(mood, memberDisplayName);
        MoodResponseDto response = mapper.moodToMoodResponseDto(saveMood);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{member-displayName}/{mood-id}")
    public ResponseEntity<MoodResponseDto> patchMood(@PathVariable("member-displayName") String memberDisplayName,
                                                     @PathVariable("mood-id") Long moodId,
                                                     @RequestBody MoodPatchDto patchDto){
        Mood mood = mapper.moodPatchDtoToMood(patchDto);
        Mood saveMood = moodService.updateMood(mood, memberDisplayName, moodId);
        MoodResponseDto response = mapper.moodToMoodResponseDto(saveMood);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping("/{member-displayName}")
    public ResponseEntity<List<MoodResponseDto>> getMoods(@PathVariable("member-displayName") String memberDisplayName){
        List<Mood> moods = moodService.findMoods(memberDisplayName);
        System.out.println(moods.size());
        List<MoodResponseDto> response = mapper.moodsToMoodResponseDtos(moods);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/day/{member-displayName}")
    public ResponseEntity<MoodResponseDto> getMood(@PathVariable("member-displayName") String memberDisplayName) {
        Mood mood = moodService.findMood(memberDisplayName);
        MoodResponseDto response = mapper.moodToMoodResponseDto(mood);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/week/{member-displayName}")
    public ResponseEntity<List<MoodResponseDto>> getMoodWeek(@PathVariable("member-displayName") String memberDisplayName){
        List<Mood> moodsWeek = moodService.findMoodsWeek(memberDisplayName);
        List<MoodResponseDto> response = mapper.moodsToMoodResponseDtos(moodsWeek);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/month/{member-displayName}/{month}")
    public ResponseEntity<List<MoodResponseDto>> getMoodMonth(@PathVariable("member-displayName") String memberDisplayName,
                                                              @PathVariable("month") int month) {

        List<Mood> moodsMonth = moodService.findMoodsMonth(memberDisplayName, month);
        List<MoodResponseDto> response = mapper.moodsToMoodResponseDtos(moodsMonth);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/year/{member-displayName}/{year}")
    public ResponseEntity<List<MoodResponseDto>> getMoodYear(@PathVariable("member-displayName") String memberDisplayName,
                                                             @PathVariable("year") int year){
        List<Mood> moodsYear = moodService.findMoodsYear(memberDisplayName, year);
        List<MoodResponseDto> response = mapper.moodsToMoodResponseDtos(moodsYear);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}/{mood-id}")
    public void deleteMood(@PathVariable("member-id") Long memberId,
                           @PathVariable("mood-id") Long moodId){
        moodService.deleteMood(memberId, moodId);
    }

}
