package com.codestates.mainproject.member.repository;

import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.mood.entity.Mood;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findById(Long memberId);

    Optional<Member> findByDisplayName(String displayName);

    Optional<Member> findByEmail(String email);


}
