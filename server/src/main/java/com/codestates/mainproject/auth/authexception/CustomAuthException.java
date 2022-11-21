package com.codestates.mainproject.auth.authexception;

import com.codestates.mainproject.auth.common.CommonCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.security.auth.message.AuthException;

@RequiredArgsConstructor
public class CustomAuthException extends AuthException {

    @Getter
    private final CommonCode commonCode;

}
