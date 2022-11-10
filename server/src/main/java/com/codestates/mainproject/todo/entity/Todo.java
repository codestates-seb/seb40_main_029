package com.codestates.mainproject.todo.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table
public class Todo {

    @Id
    private Long todoId;

    private String title;

    private boolean selected;
}
