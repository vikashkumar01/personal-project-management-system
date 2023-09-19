package com.example.pma.PM.Exception;

public class ProjectTaskAlreadyExistResponse {

    public String message;

    public ProjectTaskAlreadyExistResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
