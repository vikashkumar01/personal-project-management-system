package com.example.pma.PM.Exception;

public class ProjecTaskIdExceptionResponse {

    public String projetTaskId;

    public ProjecTaskIdExceptionResponse(String projetTaskId) {
        this.projetTaskId = projetTaskId;
    }

    public String getProjetTaskId() {
        return projetTaskId;
    }

    public void setProjetTaskId(String projetTaskId) {
        this.projetTaskId = projetTaskId;
    }
}
