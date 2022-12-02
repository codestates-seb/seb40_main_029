package com.codestates.mainproject.todo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TodoResponseDto {

    private Long todoId;
    private String title;
    private boolean selected;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
