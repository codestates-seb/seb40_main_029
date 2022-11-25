package com.codestates.mainproject.palette.mapper;

import com.codestates.mainproject.palette.dto.PaletteResponseDto;
import com.codestates.mainproject.palette.entity.MoodPaletteDetails;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-24T17:56:57+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.16.1 (Azul Systems, Inc.)"
)
@Component
public class PaletteMapperImpl implements PaletteMapper {

    @Override
    public List<PaletteResponseDto> MoodPaletteDetailsToPaletteResponseDto(List<MoodPaletteDetails> moodPaletteDetails) {
        if ( moodPaletteDetails == null ) {
            return null;
        }

        List<PaletteResponseDto> list = new ArrayList<PaletteResponseDto>( moodPaletteDetails.size() );
        for ( MoodPaletteDetails moodPaletteDetails1 : moodPaletteDetails ) {
            list.add( moodPaletteDetailsToPaletteResponseDto( moodPaletteDetails1 ) );
        }

        return list;
    }

    protected PaletteResponseDto moodPaletteDetailsToPaletteResponseDto(MoodPaletteDetails moodPaletteDetails) {
        if ( moodPaletteDetails == null ) {
            return null;
        }

        PaletteResponseDto paletteResponseDto = new PaletteResponseDto();

        paletteResponseDto.setPaletteCode( moodPaletteDetails.getPaletteCode() );
        paletteResponseDto.setMoodCode( moodPaletteDetails.getMoodCode() );
        paletteResponseDto.setColorCode( moodPaletteDetails.getColorCode() );
        paletteResponseDto.setMood( moodPaletteDetails.getMood() );

        return paletteResponseDto;
    }
}
