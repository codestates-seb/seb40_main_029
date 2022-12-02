package com.codestates.mainproject.palette.repository;

import com.codestates.mainproject.palette.entity.MoodPaletteDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MoodPaletteDetailsRepository extends JpaRepository<MoodPaletteDetails, String> {
    Optional<MoodPaletteDetails> findByMoodCodeAndPaletteCode(String moodCode, String paletteCode);

    Optional<List<MoodPaletteDetails>> findAllByPaletteCode(String paletteCode);
}
