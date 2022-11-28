package com.codestates.mainproject.todo.mapper;

import com.codestates.mainproject.todo.dto.TodoPatchDto;
import com.codestates.mainproject.todo.dto.TodoPostDto;
import com.codestates.mainproject.todo.dto.TodoResponseDto;
import com.codestates.mainproject.todo.entity.Todo;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TodoMapper {

    Todo todoPostDtoToTodo(TodoPostDto todoPostDto);

    Todo todoPatchDtoToTodo(TodoPatchDto todoPatchDto);

    TodoResponseDto todoToTodoResponseDto(Todo todo);

    List<TodoResponseDto> todosToTodoResponseDtos(List<Todo> todos);
}
