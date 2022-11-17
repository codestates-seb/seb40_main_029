package com.codestates.mainproject.palette.mapper;

import com.codestates.mainproject.mood.dto.MoodResponseDto;
import com.codestates.mainproject.mood.entity.Mood;
import com.codestates.mainproject.palette.dto.PaletteResponseDto;
import com.codestates.mainproject.palette.entity.MoodPaletteDetails;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PaletteMapper {

    List<PaletteResponseDto> MoodPaletteDetailsToPaletteResponseDto(List<MoodPaletteDetails> moodPaletteDetails);
}
