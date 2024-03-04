package com.example.analysis.error;

public class SprintNotFoundException extends Exception{
    public SprintNotFoundException() {
        super();
    }

    public SprintNotFoundException(String message) {
        super(message);
    }

    public SprintNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public SprintNotFoundException(Throwable cause) {
        super(cause);
    }

    protected SprintNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
