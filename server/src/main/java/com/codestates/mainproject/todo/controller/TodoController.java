package com.codestates.mainproject.todo.controller;

import com.codestates.mainproject.dto.MultiResponseDto;
import com.codestates.mainproject.member.service.MemberService;
import com.codestates.mainproject.todo.dto.TodoPatchDto;
import com.codestates.mainproject.todo.dto.TodoPostDto;
import com.codestates.mainproject.todo.dto.TodoResponseDto;
import com.codestates.mainproject.todo.entity.Todo;
import com.codestates.mainproject.todo.mapper.TodoMapper;
import com.codestates.mainproject.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/todo")
public class TodoController {

    private final TodoService todoService;
    private final MemberService memberService;
    private final TodoMapper mapper;


    @PostMapping("/{member-id}")
    public ResponseEntity<TodoResponseDto> postTodo(@RequestBody TodoPostDto postDto,
                                                       @PathVariable("member-id") Long memberId){
        Todo todo = mapper.todoPostDtoToTodo(postDto);
        Todo saveTodo = todoService.createdTodo(todo, memberId);
        TodoResponseDto response = mapper.todoToTodoResponseDto(saveTodo);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/title/{member-id}/{todo-id}")

    public ResponseEntity<TodoResponseDto> patchTodo(@RequestBody TodoPatchDto patchDto,
                                                     @PathVariable("member-id") Long memberId,
                                                     @PathVariable("todo-id") Long todoId){
        Todo todo = mapper.todoPatchDtoToTodo(patchDto);
        Todo updateTodo = todoService.updateTodo(todo, todoId, memberId);

        TodoResponseDto response = mapper.todoToTodoResponseDto(updateTodo);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/selected/{member-id}/{todo-id}")
    public ResponseEntity seletedTodo(@PathVariable("member-id") Long memberId,
                                                     @PathVariable("todo-id") Long todoId){
        Todo updateTodo = todoService.seletedTodo(todoId, memberId);
        TodoResponseDto response = mapper.todoToTodoResponseDto(updateTodo);
        long point = memberService.memberPoint(memberId);

        return new ResponseEntity<>(new MultiResponseDto<>(response, point), HttpStatus.OK);
    }

    @PatchMapping("/update/{member-id}")
    public ResponseEntity<List<TodoResponseDto>> TodoRenewal(@PathVariable("member-id") Long memberId){
        List<Todo> todos = todoService.renewalTodo(memberId);
        List<TodoResponseDto> response = mapper.todosToTodoResponseDtos(todos);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{member-id}/{todo-id}")
    public ResponseEntity<TodoResponseDto> getTodo(@PathVariable("member-id") Long memberId,
                                                    @PathVariable("todo-id") Long todoId){
        Todo findTodo = todoService.findTodo(memberId, todoId);
        TodoResponseDto response = mapper.todoToTodoResponseDto(findTodo);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/today/{member-id}")
    public ResponseEntity<List<TodoResponseDto>> getTodayTodo(@PathVariable("member-id") Long memberId){
        List<Todo> todoList = todoService.findTodoList(memberId);
        List<TodoResponseDto> response = mapper.todosToTodoResponseDtos(todoList);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity<List<TodoResponseDto>> getAllTodo(@PathVariable("member-id") Long memberId){
        List<Todo> todoList = todoService.findAllTodoList(memberId);
        List<TodoResponseDto> response = mapper.todosToTodoResponseDtos(todoList);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}/{todo-id}")
    public void eraseTodo(@PathVariable("member-id") Long memberId,
                           @PathVariable("todo-id") Long todoId){
        todoService.deleteTodo(todoId, memberId);
    }

    @DeleteMapping("/{member-id}")
    public void eraseTodos(@PathVariable("member-id") Long memberId){
        todoService.deleteTodoList(memberId);
    }
}
