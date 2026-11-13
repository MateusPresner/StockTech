package br.com.stocktech.service;

import br.com.stocktech.domain.Fornecedor;
import br.com.stocktech.repository.FornecedorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FornecedorService {

    private final FornecedorRepository repository;

    public FornecedorService(FornecedorRepository repository) {
        this.repository = repository;
    }

    public Fornecedor salvar(Fornecedor fornecedor) {

        if (fornecedor.getCnpj() != null
                && !fornecedor.getCnpj().isBlank()
                && repository.findByCnpj(fornecedor.getCnpj()).isPresent()) {

            throw new IllegalArgumentException("CNPJ já cadastrado.");
        }

        return repository.save(fornecedor);
    }

    public List<Fornecedor> listarTodos() {
        return repository.findAll();
    }
}