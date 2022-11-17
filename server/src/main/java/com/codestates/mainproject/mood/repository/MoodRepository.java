package com.codestates.mainproject.mood.repository;

import com.codestates.mainproject.mood.entity.Mood;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MoodRepository extends JpaRepository<Mood, Long> {

    Optional<Mood> findByMoodIdAndMember_MemberId(Long moodId, Long memberId);

    Optional<List<Mood>> findAllByMember_MemberId(Long memberId);

    void deleteByMember_MemberIdAndMoodId(Long memberId, Long moodId);
}
