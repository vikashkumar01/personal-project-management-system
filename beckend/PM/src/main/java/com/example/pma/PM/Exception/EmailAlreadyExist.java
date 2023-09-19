package com.example.pma.PM.Exception;

public class EmailAlreadyExist extends RuntimeException{

    public EmailAlreadyExist(String message) {
        super(message);
    }
}
