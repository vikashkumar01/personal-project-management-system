package com.example.pma.PM.Exception;

public class JwtExpires extends RuntimeException{

    public JwtExpires(String message) {
        super(message);
    }
}
