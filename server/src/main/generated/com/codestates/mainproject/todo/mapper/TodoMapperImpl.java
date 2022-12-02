package com.codestates.mainproject.todo.mapper;

import com.codestates.mainproject.todo.dto.TodoPatchDto;
import com.codestates.mainproject.todo.dto.TodoPostDto;
import com.codestates.mainproject.todo.dto.TodoResponseDto;
import com.codestates.mainproject.todo.entity.Todo;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-02T18:13:40+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.16.1 (Azul Systems, Inc.)"
)
@Component
public class TodoMapperImpl implements TodoMapper {

    @Override
    public Todo todoPostDtoToTodo(TodoPostDto todoPostDto) {
        if ( todoPostDto == null ) {
            return null;
        }

        Todo todo = new Todo();

        todo.setTitle( todoPostDto.getTitle() );

        return todo;
    }

    @Override
    public Todo todoPatchDtoToTodo(TodoPatchDto todoPatchDto) {
        if ( todoPatchDto == null ) {
            return null;
        }

        Todo todo = new Todo();

        todo.setTitle( todoPatchDto.getTitle() );

        return todo;
    }

    @Override
    public TodoResponseDto todoToTodoResponseDto(Todo todo) {
        if ( todo == null ) {
            return null;
        }

        TodoResponseDto todoResponseDto = new TodoResponseDto();

        todoResponseDto.setTodoId( todo.getTodoId() );
        todoResponseDto.setTitle( todo.getTitle() );
        todoResponseDto.setSelected( todo.isSelected() );
        todoResponseDto.setCreatedAt( todo.getCreatedAt() );
        todoResponseDto.setModifiedAt( todo.getModifiedAt() );

        return todoResponseDto;
    }

    @Override
    public List<TodoResponseDto> todosToTodoResponseDtos(List<Todo> todos) {
        if ( todos == null ) {
            return null;
        }

        List<TodoResponseDto> list = new ArrayList<TodoResponseDto>( todos.size() );
        for ( Todo todo : todos ) {
            list.add( todoToTodoResponseDto( todo ) );
        }

        return list;
    }
}
