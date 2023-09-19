package com.example.pma.PM.Exception;

public class InvalidCredentailsResponse {

    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public InvalidCredentailsResponse(String message) {
        this.message = message;
    }
}
