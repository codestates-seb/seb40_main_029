package com.codestates.mainproject.todo.service;

import com.codestates.mainproject.exception.BusinessLogicException;
import com.codestates.mainproject.exception.ExceptionCode;
import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.member.repository.MemberRepository;
import com.codestates.mainproject.member.service.MemberService;
import com.codestates.mainproject.todo.entity.Todo;
import com.codestates.mainproject.todo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    public Todo createdTodo(Todo todo, Long memberId){
        Member member = memberService.verifyMember(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        todo.setMember(member);
        return todoRepository.save(todo);
    }

    public Todo updateTodo(Todo todo, Long todoId, Long memberId){

        Todo findTodo = verifyTodo(todoId, memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TODO_NOT_FOUND));
        findTodo.setTitle(todo.getTitle());

        return todoRepository.save(findTodo);
    }

    public Todo seletedTodo(Long todoId, Long memberId){

        Member member = memberService.verifyMember(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Todo seletedTodo = verifyTodo(todoId, memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TODO_NOT_FOUND));

        seletedTodo.setSelected(true);
        member.setPoint(member.getPoint() + 50);

        memberRepository.save(member);
        return todoRepository.save(seletedTodo);
    }

    public Todo findTodo(Long memberId, Long todoId){

        return verifyTodo(todoId, memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TODO_NOT_FOUND));
    }

    public List<Todo> findTodoList(Long memberId){
        LocalDateTime startDateTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(0, 0, 0)); //오늘 날짜 기준 0시 0분 0초
        LocalDateTime endDateTime = LocalDateTime.of(LocalDate.now().plusDays(1), LocalTime.of(3, 59, 59)); // 오늘 날짜 기준 +1일 오전 3시 59분 59초

        List<Todo> todoList = todoRepository.findAllByMember_MemberIdAndCreatedAtBetween(memberId, startDateTime, endDateTime);
        return todoList;
    }

    public void deleteTodo(Long todoId, Long memberId){
        todoRepository.deleteByTodoIdAndMember_MemberId(todoId, memberId);
    }

    public void deleteTodoList(Long memberId){
        todoRepository.deleteAllByMember_MemberId(memberId);
    }

    public Optional<Todo> verifyTodo(Long todoId, Long memberId){
        return todoRepository.findByTodoIdAndMember_MemberId(todoId, memberId);
    }

    public Optional<List<Todo>> verifyTodoList(Long memberId){
        return todoRepository.findAllByMember_MemberId(memberId);
    }
}
