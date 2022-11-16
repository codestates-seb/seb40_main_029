package com.codestates.mainproject.mood.controller;

import com.codestates.mainproject.mood.dto.MoodPatchDto;
import com.codestates.mainproject.mood.dto.MoodPostDto;
import com.codestates.mainproject.mood.dto.MoodResponseDto;
import com.codestates.mainproject.mood.entity.Mood;
import com.codestates.mainproject.mood.mapper.MoodMapper;
import com.codestates.mainproject.mood.service.MoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mood")
@RequiredArgsConstructor
public class MoodController {

    private final MoodService moodService;
    private final MoodMapper mapper;

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

    @GetMapping("/{member-displayName}/{mood-id}")
    public ResponseEntity<MoodResponseDto> patchMood(@PathVariable("member-displayName") String memberDisplayName,
                                                     @PathVariable("mood-id") Long moodId) {
        Mood mood = moodService.findMood(memberDisplayName, moodId);
        MoodResponseDto response = mapper.moodToMoodResponseDto(mood);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{member-displayName}")
    public ResponseEntity<List<MoodResponseDto>> patchMood(@PathVariable("member-displayName") String memberDisplayName){
        List<Mood> moods = moodService.findMoods(memberDisplayName);
        List<MoodResponseDto> response = mapper.moodsToMoodResponseDtos(moods);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}/{mood-id}")
    public void deleteMood(@PathVariable("member-id") Long memberId,
                           @PathVariable("mood-id") Long moodId){
        moodService.deleteMood(memberId, moodId);
    }

}
