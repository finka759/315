package ru.kata.spring.boot_security.demo.exeption_handing;

public class NoSuchUserException extends RuntimeException {
    public NoSuchUserException(String message) {
        super(message);
    }
}
