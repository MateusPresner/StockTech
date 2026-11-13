
package br.com.stocktech.service;

import br.com.stocktech.domain.Categoria;
import br.com.stocktech.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public Categoria salvar(Categoria categoria) {

        categoriaRepository.findByNomeIgnoreCase(categoria.getNome())
                .ifPresent(existente -> {
                    throw new IllegalArgumentException(
                            "Já existe uma categoria com esse nome."
                    );
                });

        return categoriaRepository.save(categoria);
    }

    public List<Categoria> listarTodas() {
        return categoriaRepository.findAll();
    }

public Categoria atualizar(Long id, Categoria dados) {

    Categoria categoria = categoriaRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException(
                    "Categoria não encontrada."
            ));

    categoriaRepository.findByNomeIgnoreCase(dados.getNome())
            .filter(existente -> !existente.getId().equals(id))
            .ifPresent(existente -> {
                throw new IllegalArgumentException(
                        "Já existe uma categoria com esse nome."
                );
            });

    categoria.setNome(dados.getNome());
    categoria.setDescricao(dados.getDescricao());

    return categoriaRepository.save(categoria);
}

public void excluir(Long id) {

    Categoria categoria = categoriaRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException(
                    "Categoria não encontrada."
            ));

    categoriaRepository.delete(categoria);
}

}
