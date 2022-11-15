package com.codestates.mainproject.auth.exception;

public enum ExceptionCode {

    OAUTH_LOGIN_FAILED(401, "로그인에 실패했습니다."),

    INVALID_SOCIAL_LOGIN_TYPE(400, "로그인 타입이 잘못되었습니다."),

    OAUTH_CHECK_SUCCESS(200, "가입이 필요합니다."),

    USER_ALREADY_EXIST(200, "토큰이 발급되었습니다.");


    private int status;
    private String msg;

    ExceptionCode(int status, String msg) {
        this.status = status;
        this.msg = msg;
    }
}
