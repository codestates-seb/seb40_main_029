package com.codestates.mainproject.palette.repository;

import com.codestates.mainproject.palette.entity.MoodPalette;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MoodPaletteRepository extends JpaRepository<MoodPalette, String> {
}
