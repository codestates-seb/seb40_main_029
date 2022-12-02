package com.codestates.mainproject.mood.mapper;

import com.codestates.mainproject.mood.dto.MoodPatchDto;
import com.codestates.mainproject.mood.dto.MoodPostDto;
import com.codestates.mainproject.mood.dto.MoodResponseDto;
import com.codestates.mainproject.mood.entity.Mood;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MoodMapperImp implements MoodMapper{
    @Override
    public Mood moodPostDtoToMood(MoodPostDto moodPostDto) {
        Mood mood = new Mood();
        mood.setPaletteCode(moodPostDto.getPaletteCode());
        mood.setMoodCode(moodPostDto.getMoodCode());
        mood.setBody(moodPostDto.getBody());

        return mood;
    }

    @Override
    public Mood moodPatchDtoToMood(MoodPatchDto moodPatchDto) {
        Mood mood = new Mood();
        mood.setPaletteCode(moodPatchDto.getPaletteCode());
        mood.setMoodCode(moodPatchDto.getMoodCode());
        mood.setBody(moodPatchDto.getBody());

        return mood;
    }

    @Override
    public MoodResponseDto moodToMoodResponseDto(Mood mood) {
        MoodResponseDto moodResponseDto = new MoodResponseDto();
        moodResponseDto.setMoodId(mood.getMoodId());
        moodResponseDto.setMemberId(mood.getMember().getMemberId());
        moodResponseDto.setBody(mood.getBody());
        moodResponseDto.setMoodPaletteDetails(mood.getMoodPaletteDetails());
        moodResponseDto.setCreatedAt(mood.getCreatedAt());

        return  moodResponseDto;
    }

    @Override
    public List<MoodResponseDto> moodsToMoodResponseDtos(List<Mood> moods) {
        List<MoodResponseDto> moodResponseDtos = new ArrayList<>();
        for(int i=0; i < moods.size(); i++){
            moodResponseDtos.add(new MoodResponseDto());
            moodResponseDtos.get(i).setMoodId(moods.get(i).getMoodId());
            moodResponseDtos.get(i).setMemberId(moods.get(i).getMember().getMemberId());
            moodResponseDtos.get(i).setBody(moods.get(i).getBody());
            moodResponseDtos.get(i).setMoodPaletteDetails(moods.get(i).getMoodPaletteDetails());
            moodResponseDtos.get(i).setCreatedAt(moods.get(i).getCreatedAt());
        }
        return moodResponseDtos;
    }
}
