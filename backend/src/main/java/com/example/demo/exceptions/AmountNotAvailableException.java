package com.example.demo.exceptions;

public class AmountNotAvailableException extends RuntimeException{
    public AmountNotAvailableException(String message){
        super(message);
    }
}
