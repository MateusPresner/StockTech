
package br.com.stocktech.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> tratarErroDeRegra(
            IllegalArgumentException erro) {

        HttpStatus status = erro.getMessage().contains("não encontrado")
                ? HttpStatus.NOT_FOUND
                : HttpStatus.BAD_REQUEST;

        Map<String, Object> resposta = Map.of(
                "dataHora", LocalDateTime.now(),
                "status", status.value(),
                "erro", erro.getMessage()
        );

        return ResponseEntity.status(status).body(resposta);
    }
}
