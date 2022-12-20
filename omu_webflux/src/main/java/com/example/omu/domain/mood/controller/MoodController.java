package com.example.omu.domain.mood.controller;

import com.example.omu.domain.mood.dto.MoodPostDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/mood")
public class MoodController {

    @PostMapping
    public Flux<ResponseEntity<?>> postMood(@RequestBody MoodPostDto postDto){
        return null;
    }
}
