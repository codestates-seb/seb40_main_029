package com.codestates.mainproject.auth.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.security.auth.message.AuthException;

@RequiredArgsConstructor
public class CustomAuthException extends AuthException {

    @Getter
    private final ExceptionCode exceptionCode;

}
