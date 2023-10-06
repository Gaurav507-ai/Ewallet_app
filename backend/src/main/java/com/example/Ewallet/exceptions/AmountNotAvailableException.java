package com.example.Ewallet.exceptions;

public class AmountNotAvailableException extends RuntimeException{
    public AmountNotAvailableException(String message){
        super(message);
    }
}
