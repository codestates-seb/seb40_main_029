package com.codestates.mainproject.todo.repository;

import com.codestates.mainproject.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TodoRepository extends JpaRepository<Todo, Long> {
      Optional<Todo> findByTodoIdAndMember_MemberId(Long todoId, Long memberid);
     List<Todo> findAllByMember_MemberId(Long memberId);

      List<Todo> findAllByMember_MemberIdAndCreatedAtBetween(Long memberId,
                                                             LocalDateTime start,
                                                             LocalDateTime end);
      List<Todo> findAllByMember_MemberIdAndModifiedAtBetween(Long memberId,
                                                             LocalDateTime start,
                                                             LocalDateTime end);

      void deleteByTodoIdAndMember_MemberId(Long todoId, Long memberId);
      void deleteAllByMember_MemberId(Long memberId);
}
