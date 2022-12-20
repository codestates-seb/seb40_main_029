package com.example.omu.domain.palette.controller;


import com.example.omu.domain.palette.dto.PaletteResponseDto;
import com.example.omu.domain.palette.entity.MoodPalette;
import com.example.omu.domain.palette.repository.MoodPaletteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/palette")
@RequiredArgsConstructor
@Slf4j
public class PaletteController {

    private final MoodPaletteRepository moodPaletteRepository;


    @GetMapping
    public ResponseEntity<Flux<MoodPalette>> getPalette(){
        Flux<MoodPalette> response = moodPaletteRepository.findAll();
        log.info(" 팔레트 데이터 조회에 성공하였습니다..");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    @GetMapping
//    public ResponseEntity<Mono<List<PaletteResponseDto>>> getAllPalette(){
//
//        log.info("모든 팔레트 데이터 조회에 성공하였습니다.");
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }
}
