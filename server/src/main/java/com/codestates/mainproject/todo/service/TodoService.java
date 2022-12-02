package com.codestates.mainproject.todo.service;

import com.codestates.mainproject.exception.BusinessLogicException;
import com.codestates.mainproject.exception.ExceptionCode;
import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.member.repository.MemberRepository;
import com.codestates.mainproject.member.service.MemberService;
import com.codestates.mainproject.todo.entity.Todo;
import com.codestates.mainproject.todo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TodoService {

    private final TodoRepository todoRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;


    /*Todo 등록*/
    public Todo createdTodo(Todo todo, Long memberId){
        Member member = memberService.verifyMember(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        todo.setMember(member);
        return todoRepository.save(todo);
    }

    /*Todo title 변경*/
    public Todo updateTodo(Todo todo, Long todoId, Long memberId){

        Todo findTodo = verifyTodo(todoId, memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TODO_NOT_FOUND));
        findTodo.setTitle(todo.getTitle());

        return todoRepository.save(findTodo);
    }

    /*Todo 완료처리*/
    public Todo seletedTodo(Long todoId, Long memberId){

        Member member = memberService.verifyMember(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Todo seletedTodo = verifyTodo(todoId, memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TODO_NOT_FOUND));

        LocalDateTime startDateTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(0, 0, 0));
        LocalDateTime endDateTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23, 59, 59));
        List<Todo> todoList = todoRepository.findAllByMember_MemberIdAndModifiedAtBetween(memberId, startDateTime, endDateTime)
                .stream()
                .filter(todo -> todo.isSelected())
                .collect(Collectors.toList());

        if(todoList.size() == 0){
            member.setPoint(member.getPoint() + 50);
        }
        seletedTodo.setSelected(true);
        return todoRepository.save(seletedTodo);
    }

    /*Todo 개별 조회*/
    public Todo findTodo(Long memberId, Long todoId){

        return verifyTodo(todoId, memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TODO_NOT_FOUND));
    }

    /*작일 미완료Todo -> 오늘 날짜로 업데이트*/
    public List<Todo> renewalTodo(Long memberId){
        LocalDateTime YesStartDateTime = LocalDateTime.of(LocalDate.now().minusDays(1), LocalTime.of(0, 0, 0)); //어제 날짜 기준 0시 0분 0초
        LocalDateTime YesEndDateTime = LocalDateTime.of(LocalDate.now().minusDays(1), LocalTime.of(23, 59, 59)); // 어제 날짜 기준 23시 59분 59초

//        LocalDateTime YesStartDateTime = LocalDateTime.now().minusMinutes(1); //어제 날짜 기준 0시 0분 0초
//        LocalDateTime YesEndDateTime = LocalDateTime.now();

        LocalDateTime startDateTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(0, 0, 0));
//        LocalDateTime startDateTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(0, 0, 0));
        LocalDateTime endDateTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23, 59, 59));

        List<Todo> todoList = todoRepository.findAllByMember_MemberIdAndCreatedAtBetween(memberId, YesStartDateTime, YesEndDateTime);
        List<Todo> falseTodo = todoList.stream()
                .filter(todo -> !todo.isSelected())
                .collect(Collectors.toList());

        for (Todo todo : todoList) {
            if (!todo.isSelected()) {
                if(todo.isUpdateTodo()){
                    todo.setUpdateTodo(false);
                }else {
                    todo.setUpdateTodo(true);
                }
                todoRepository.save(todo);
            }
        }
        return falseTodo;
    }

    /*오늘 등록한Todo 조회*/
    public List<Todo> findTodoList(Long memberId){
        LocalDateTime startDateTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(0, 0, 0)); //오늘 날짜 기준 0시 0분 0초
        LocalDateTime endDateTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23, 59, 59)); // 오늘 날짜 기준 23시 59분 59초

        List<Todo> todoList = todoRepository.findAllByMember_MemberIdAndModifiedAtBetween(memberId, startDateTime, endDateTime);
        return todoList;
    }

    /*등록한 모든 Todo 조회*/
    public List<Todo> findAllTodoList(Long memberId){

        List<Todo> todoList = todoRepository.findAllByMember_MemberId(memberId);
        return todoList;
    }

    /*Todo 삭제*/
    public void deleteTodo(Long todoId, Long memberId){
        todoRepository.deleteByTodoIdAndMember_MemberId(todoId, memberId);
    }

    /*모든 Todo 삭제*/
    public void deleteTodoList(Long memberId){
        todoRepository.deleteAllByMember_MemberId(memberId);
    }

    /*내가 등록한 Todo DB에서 조회*/
    public Optional<Todo> verifyTodo(Long todoId, Long memberId){
        return todoRepository.findByTodoIdAndMember_MemberId(todoId, memberId);
    }

    /*내가 등록한 모든 Todo DB에서 조회*/
    public List<Todo> verifyTodoList(Long memberId){
        return todoRepository.findAllByMember_MemberId(memberId);
    }
}
