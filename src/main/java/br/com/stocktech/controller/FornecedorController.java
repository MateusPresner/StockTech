
package br.com.stocktech.controller;

import br.com.stocktech.domain.Fornecedor;
import br.com.stocktech.service.FornecedorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fornecedores")
public class FornecedorController {

    private final FornecedorService service;

    public FornecedorController(FornecedorService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Fornecedor> salvar(@RequestBody Fornecedor fornecedor) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.salvar(fornecedor));
    }

    @GetMapping
    public ResponseEntity<List<Fornecedor>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }
}
