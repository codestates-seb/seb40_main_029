package com.codestates.mainproject.exception;

public enum ExceptionCode {

    INVALID_INPUT_VALUE(400, "INVALID INPUT VALUE"),
    INVALID_INPUT_ATK(400, "INVALID INPUT ACCESS_TOKEN"),
    HANDLE_ACCESS_DENIED(403, "HANDLE ACCESS DENIED"),
    MEMBER_NOT_FOUND(404, "MEMBER NOT FOUND"), //
    MOOD_NOT_FOUND(404, "MOOD_NOT_FOUND"),
    PALETTE_NOT_FOUND(404, "PALETTE_NOT_FOUND"), //
    TODO_NOT_FOUND(404, "TODO_NOT_FOUND"), //
    METHOD_NOT_ALLOWED(405, "METHOD NOT ALLOWED"),
    MEMBER_EXISTS(409, "MEMBER_EXISTS"), //
    FRIEND_EXISTS(409, "FRIEND_EXISTS"), //
    NOT_ENOUGH_POINT(204, "NOT_ENOUGH_POINT"), //
    MAIL_EXISTS(409, "MAIL_EXISTS"), //
    MOOD_EXISTS(409, "MOOD_EXISTS"), //
    MEMBER_DISPLAY_NAME_EXISTS(409, "MEMBER_DISPLAY_NAME_EXISTS"),
    MEMBER_EMAIL_EXISTS(409, "MEMBER_EMAIL_EXISTS"),
    INTERNAL_SERVER_ERROR(500, "INTERNAL SERVER ERROR");

    private int status;
    private String message;

    private ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }

    public int getStatus() {
        return this.status;
    }

    public String getMessage() {
        return this.message;
    }
}
