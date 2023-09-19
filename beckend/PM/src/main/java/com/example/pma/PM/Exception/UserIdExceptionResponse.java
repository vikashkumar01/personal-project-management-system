package com.example.pma.PM.Exception;

public class UserIdExceptionResponse {

    public String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public UserIdExceptionResponse(String message) {
        this.message = message;
    }
}
