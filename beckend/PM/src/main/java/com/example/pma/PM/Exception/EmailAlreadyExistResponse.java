package com.example.pma.PM.Exception;

public class EmailAlreadyExistResponse {

    public String message;

    public EmailAlreadyExistResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
