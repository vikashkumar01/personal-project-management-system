package com.example.pma.PM.Exception;

public class ProjectAlreadyExistResponse {

    public String message;

    ProjectAlreadyExistResponse(String message){
        this.message=message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
