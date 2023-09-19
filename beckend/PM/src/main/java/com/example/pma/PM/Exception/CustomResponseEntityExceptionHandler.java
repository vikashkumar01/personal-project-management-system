package com.example.pma.PM.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {


    @ExceptionHandler(ProjectIdException.class)
    public final ResponseEntity<Object> handleProjectIdException(ProjectIdException ex, WebRequest wr){
        ProjectIdExceptionResponse pier = new ProjectIdExceptionResponse(ex.getMessage());
        return new ResponseEntity(pier, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ProjectAlreadyExist.class)
    public final ResponseEntity<Object> handleProjectAlreadyExistException(ProjectAlreadyExist ex, WebRequest wr){
        ProjectAlreadyExistResponse pier = new ProjectAlreadyExistResponse(ex.getMessage());
        return new ResponseEntity(pier, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ProjectTaskIdException.class)
    public final ResponseEntity<Object> handleProjectTaskIdException(ProjectTaskIdException ex, WebRequest wr){
        ProjectIdExceptionResponse pier = new ProjectIdExceptionResponse(ex.getMessage());
        return new ResponseEntity(pier, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ProjectTaskAlreadyExist.class)
    public final ResponseEntity<Object> handleProjectTaskAlreadyExistException(ProjectTaskAlreadyExist ex, WebRequest wb){
        ProjectTaskAlreadyExistResponse pier = new ProjectTaskAlreadyExistResponse(ex.getMessage());
        return new ResponseEntity<>(pier,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmailAlreadyExist.class)
    public final ResponseEntity<Object> handleEmailAlreadyExistException(EmailAlreadyExist ex, WebRequest wb){
        EmailAlreadyExistResponse pier = new EmailAlreadyExistResponse(ex.getMessage());
        return new ResponseEntity<>(pier,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserIdException.class)
    public final ResponseEntity<Object> handleUserIdException(UserIdException ex, WebRequest wb){
        UserIdExceptionResponse pier = new UserIdExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(pier,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidCredentails.class)
    public final ResponseEntity<Object> handleInvalidCredentails(InvalidCredentails ex){
        InvalidCredentailsResponse pire = new InvalidCredentailsResponse(ex.getMessage());
        return new ResponseEntity<>(pire,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(JwtExpires.class)
    public final ResponseEntity<Object> handleInvalidToken(JwtExpires ex){
        JwtResponse pire = new JwtResponse(ex.getMessage());
        return new ResponseEntity<>(pire,HttpStatus.BAD_REQUEST);
    }




}
