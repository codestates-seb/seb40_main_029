package com.example.omu.domain.palette.repository;


import com.example.omu.domain.palette.entity.MoodPalette;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface MoodPaletteRepository extends ReactiveCrudRepository<MoodPalette, String> {
}
