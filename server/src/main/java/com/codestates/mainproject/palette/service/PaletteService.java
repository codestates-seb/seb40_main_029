package com.codestates.mainproject.palette.service;

import com.codestates.mainproject.exception.BusinessLogicException;
import com.codestates.mainproject.exception.ExceptionCode;
import com.codestates.mainproject.palette.entity.MoodPaletteDetails;
import com.codestates.mainproject.palette.repository.MoodPaletteDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PaletteService {

    private final MoodPaletteDetailsRepository moodPaletteDetailsRepository;

    public List<MoodPaletteDetails> findPalette(String paletteCode){
        return moodPaletteDetailsRepository.findAllByPaletteCode(paletteCode)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PALETTE_NOT_FOUND));
    }

    public List<MoodPaletteDetails> findAllPalette(){
        return moodPaletteDetailsRepository.findAll();
    }
}
