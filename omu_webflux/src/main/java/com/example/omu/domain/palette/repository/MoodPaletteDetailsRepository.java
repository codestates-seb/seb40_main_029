package com.example.omu.domain.palette.repository;


import com.example.omu.domain.palette.entity.MoodPalette;
import com.example.omu.domain.palette.entity.MoodPaletteDetails;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface MoodPaletteDetailsRepository extends ReactiveCrudRepository<MoodPaletteDetails, Long> {

}
