package com.codestates.mainproject.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MultiResponseDto<T> {

    private T data;
    private long point;
}
