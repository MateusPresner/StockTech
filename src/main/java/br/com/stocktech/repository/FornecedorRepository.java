package br.com.stocktech.repository;

import br.com.stocktech.domain.Fornecedor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> {
    Optional<Fornecedor> findByCnpj(String cnpj);
}
