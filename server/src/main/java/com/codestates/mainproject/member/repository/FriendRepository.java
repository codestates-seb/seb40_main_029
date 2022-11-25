package com.codestates.mainproject.member.repository;

import com.codestates.mainproject.member.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FriendRepository extends JpaRepository<Friend, Long> {
    Optional<Friend> findByRespondent_DisplayNameAndRequester_DisplayName(String Respondent, String requester);
    List<Friend> findAllByRequester_MemberId(Long requesterId);

    void deleteByRespondent_MemberId(Long respondentId);
}
