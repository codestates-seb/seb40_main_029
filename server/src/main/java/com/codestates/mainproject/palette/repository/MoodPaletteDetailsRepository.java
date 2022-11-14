package com.codestates.mainproject.palette.repository;

import com.codestates.mainproject.palette.entity.MoodPaletteDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MoodPaletteDetailsRepository extends JpaRepository<MoodPaletteDetails, String> {
}
