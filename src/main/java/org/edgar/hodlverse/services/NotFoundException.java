package org.edgar.hodlverse.services;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND) // Devuelve un 404 cuando se lanza esta excepción
public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}
