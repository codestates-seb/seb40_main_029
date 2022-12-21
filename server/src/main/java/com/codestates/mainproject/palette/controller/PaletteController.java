package com.codestates.mainproject.palette.controller;

import com.codestates.mainproject.palette.dto.PaletteResponseDto;
import com.codestates.mainproject.palette.entity.MoodPaletteDetails;
import com.codestates.mainproject.palette.mapper.PaletteMapper;
import com.codestates.mainproject.palette.service.PaletteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/palette")
@RequiredArgsConstructor
@Slf4j
public class PaletteController {

    private final PaletteService paletteService;
    private final PaletteMapper mapper;

    @GetMapping("/{palette-code}")
    public ResponseEntity<List<PaletteResponseDto>> getPalette(@PathVariable("palette-code") String paletteCode){
        List<PaletteResponseDto> response = mapper.MoodPaletteDetailsToPaletteResponseDto(paletteService.findPalette(paletteCode));
        log.info(paletteCode + " 팔레트 데이터 조회에 성공하였습니다..");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<PaletteResponseDto>> getAllPalette(){
        List<PaletteResponseDto> response = mapper.MoodPaletteDetailsToPaletteResponseDto(paletteService.findAllPalette());
        log.info("모든 팔레트 데이터 조회에 성공하였습니다.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
