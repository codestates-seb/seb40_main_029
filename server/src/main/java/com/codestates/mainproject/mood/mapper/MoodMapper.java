package com.codestates.mainproject.mood.mapper;

import com.codestates.mainproject.mood.dto.MoodPatchDto;
import com.codestates.mainproject.mood.dto.MoodPostDto;
import com.codestates.mainproject.mood.dto.MoodResponseDto;
import com.codestates.mainproject.mood.entity.Mood;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MoodMapper {

    Mood moodPostDtoToMood(MoodPostDto moodPostDto);

    Mood moodPatchDtoToMood(MoodPatchDto moodPatchDto);

    MoodResponseDto moodToMoodResponseDto(Mood mood);

    List<MoodResponseDto> moodsToMoodResponseDtos(List<Mood> moods);
}
