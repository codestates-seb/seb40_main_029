package com.codestates.mainproject.todo.repository;

import com.codestates.mainproject.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TodoRepository extends JpaRepository<Todo, Long> {
      Optional<Todo> findByTodoIdAndMember_MemberId(Long todoId, Long memberid);
      Optional<List<Todo>> findAllByMember_MemberId(Long memberId);


      void deleteByTodoIdAndMember_MemberId(Long todoId, Long memberId);
      void deleteAllByMember_MemberId(Long memberId);
}
