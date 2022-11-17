package com.codestates.mainproject.mood.mapper;

import com.codestates.mainproject.mood.dto.MoodPatchDto;
import com.codestates.mainproject.mood.dto.MoodPostDto;
import com.codestates.mainproject.mood.dto.MoodResponseDto;
import com.codestates.mainproject.mood.entity.Mood;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-16T17:49:36+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.16.1 (Azul Systems, Inc.)"
)
@Component
public class MoodMapperImpl implements MoodMapper {

    @Override
    public Mood moodPostDtoToMood(MoodPostDto moodPostDto) {
        if ( moodPostDto == null ) {
            return null;
        }

        Mood mood = new Mood();

        mood.setMoodCode( moodPostDto.getMoodCode() );
        mood.setPaletteCode( moodPostDto.getPaletteCode() );
        mood.setBody( moodPostDto.getBody() );

        return mood;
    }

    @Override
    public Mood moodPatchDtoToMood(MoodPatchDto moodPatchDto) {
        if ( moodPatchDto == null ) {
            return null;
        }

        Mood mood = new Mood();

        mood.setMoodCode( moodPatchDto.getMoodCode() );
        mood.setPaletteCode( moodPatchDto.getPaletteCode() );
        mood.setBody( moodPatchDto.getBody() );

        return mood;
    }

    @Override
    public MoodResponseDto moodToMoodResponseDto(Mood mood) {
        if ( mood == null ) {
            return null;
        }

        MoodResponseDto moodResponseDto = new MoodResponseDto();

        moodResponseDto.setMoodId( mood.getMoodId() );
        moodResponseDto.setBody( mood.getBody() );
        moodResponseDto.setMember( mood.getMember() );
        moodResponseDto.setMoodPaletteDetails( mood.getMoodPaletteDetails() );

        return moodResponseDto;
    }

    @Override
    public List<MoodResponseDto> moodsToMoodResponseDtos(List<Mood> moods) {
        if ( moods == null ) {
            return null;
        }

        List<MoodResponseDto> list = new ArrayList<MoodResponseDto>( moods.size() );
        for ( Mood mood : moods ) {
            list.add( moodToMoodResponseDto( mood ) );
        }

        return list;
    }
}
