
package br.com.stocktech.service;

import br.com.stocktech.domain.Produto;
import br.com.stocktech.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository repository;

    public ProdutoService(ProdutoRepository repository) {
        this.repository = repository;
    }

    public Produto salvar(Produto produto) {

        if (repository.findByCodigo(produto.getCodigo()).isPresent()) {
            throw new IllegalArgumentException("Já existe um produto com esse código.");
        }

        validarProduto(produto);

        return repository.save(produto);
    }

    public List<Produto> listarTodos() {
        return repository.findAll();
    }

    public Produto atualizar(Long id, Produto dados) {

        Produto produto = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado."));

        repository.findByCodigo(dados.getCodigo())
                .filter(existente -> !existente.getId().equals(id))
                .ifPresent(existente -> {
                    throw new IllegalArgumentException(
                            "Código já utilizado por outro produto."
                    );
                });

        validarProduto(dados);

        produto.setNome(dados.getNome());
        produto.setCodigo(dados.getCodigo());
        produto.setDescricao(dados.getDescricao());
        produto.setPrecoCusto(dados.getPrecoCusto());
        produto.setPrecoVenda(dados.getPrecoVenda());
        produto.setQuantidadeAtual(dados.getQuantidadeAtual());
        produto.setEstoqueMinimo(dados.getEstoqueMinimo());
        produto.setCategoria(dados.getCategoria());
        produto.setFornecedor(dados.getFornecedor());

        return repository.save(produto);
    }

    public void excluir(Long id) {

        Produto produto = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado."));

        repository.delete(produto);
    }

    private void validarProduto(Produto produto) {

        if (produto.getPrecoVenda().compareTo(produto.getPrecoCusto()) < 0) {
            throw new IllegalArgumentException(
                    "O preço de venda não pode ser menor que o preço de custo."
            );
        }

        if (produto.getQuantidadeAtual() < 0 || produto.getEstoqueMinimo() < 0) {
            throw new IllegalArgumentException(
                    "As quantidades do estoque não podem ser negativas."
            );
        }
    }
}
