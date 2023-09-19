package com.example.pma.PM.Exception;

public class JwtResponse {

    public String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public JwtResponse(String message) {
        this.message = message;
    }
}
