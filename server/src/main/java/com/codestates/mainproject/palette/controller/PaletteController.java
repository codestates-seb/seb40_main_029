package com.codestates.mainproject.palette.controller;

import com.codestates.mainproject.palette.dto.PaletteResponseDto;
import com.codestates.mainproject.palette.entity.MoodPaletteDetails;
import com.codestates.mainproject.palette.mapper.PaletteMapper;
import com.codestates.mainproject.palette.service.PaletteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/palette")
@RequiredArgsConstructor
public class PaletteController {

    private final PaletteService paletteService;
    private final PaletteMapper mapper;

    @GetMapping("/{palette-code}")
    public ResponseEntity<List<PaletteResponseDto>> getPalette(@PathVariable("palette-code") String paletteCode){
        List<PaletteResponseDto> response = mapper.MoodPaletteDetailsToPaletteResponseDto(paletteService.findPalette(paletteCode));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<PaletteResponseDto>> getAllPalette(){
        List<PaletteResponseDto> response = mapper.MoodPaletteDetailsToPaletteResponseDto(paletteService.findAllPalette());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
