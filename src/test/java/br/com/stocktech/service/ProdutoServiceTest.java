
package br.com.stocktech.service;

import br.com.stocktech.domain.Categoria;
import br.com.stocktech.domain.Fornecedor;
import br.com.stocktech.domain.Produto;
import br.com.stocktech.repository.ProdutoRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.test.util.ReflectionTestUtils;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProdutoServiceTest {

    @Mock
    private ProdutoRepository repository;

    @InjectMocks
    private ProdutoService service;

    private Produto produto;

    @BeforeEach
    void prepararProduto() {
        produto = new Produto();

        produto.setNome("Mouse Gamer");
        produto.setCodigo("MOU001");
        produto.setDescricao("Mouse com iluminação RGB");
        produto.setPrecoCusto(new BigDecimal("50.00"));
        produto.setPrecoVenda(new BigDecimal("89.90"));
        produto.setQuantidadeAtual(20);
        produto.setEstoqueMinimo(5);
        produto.setCategoria(mock(Categoria.class));
        produto.setFornecedor(mock(Fornecedor.class));
    }

    @Test
    @DisplayName("Deve cadastrar um produto válido")
    void deveCadastrarProdutoValido() {
        when(repository.findByCodigo("MOU001"))
                .thenReturn(Optional.empty());

        when(repository.save(produto)).thenReturn(produto);

        Produto resultado = service.salvar(produto);

        assertNotNull(resultado);
        assertEquals("Mouse Gamer", resultado.getNome());

        verify(repository).save(produto);
    }

    @Test
    @DisplayName("Não deve cadastrar produto com código duplicado")
    void naoDeveCadastrarCodigoDuplicado() {
        when(repository.findByCodigo("MOU001"))
                .thenReturn(Optional.of(new Produto()));

        IllegalArgumentException erro = assertThrows(
                IllegalArgumentException.class,
                () -> service.salvar(produto)
        );

        assertEquals(
                "Já existe um produto com esse código.",
                erro.getMessage()
        );

        verify(repository, never()).save(any());
    }

    @Test
    @DisplayName("Não deve aceitar preço de venda menor que o custo")
    void naoDeveAceitarPrecoDeVendaMenorQueCusto() {
        produto.setPrecoCusto(new BigDecimal("100.00"));
        produto.setPrecoVenda(new BigDecimal("80.00"));

        when(repository.findByCodigo("MOU001"))
                .thenReturn(Optional.empty());

        assertThrows(
                IllegalArgumentException.class,
                () -> service.salvar(produto)
        );

        verify(repository, never()).save(any());
    }

    @Test
    @DisplayName("Não deve aceitar quantidade negativa")
    void naoDeveAceitarQuantidadeNegativa() {
        produto.setQuantidadeAtual(-5);

        when(repository.findByCodigo("MOU001"))
                .thenReturn(Optional.empty());

        assertThrows(
                IllegalArgumentException.class,
                () -> service.salvar(produto)
        );

        verify(repository, never()).save(any());
    }

    @Test
    @DisplayName("Não deve aceitar estoque mínimo negativo")
    void naoDeveAceitarEstoqueMinimoNegativo() {
        produto.setEstoqueMinimo(-2);

        when(repository.findByCodigo("MOU001"))
                .thenReturn(Optional.empty());

        assertThrows(
                IllegalArgumentException.class,
                () -> service.salvar(produto)
        );

        verify(repository, never()).save(any());
    }

    @Test
    @DisplayName("Deve atualizar um produto existente")
    void deveAtualizarProduto() {
        Produto existente = new Produto();

        ReflectionTestUtils.setField(existente, "id", 1L);

        when(repository.findById(1L))
                .thenReturn(Optional.of(existente));

        when(repository.findByCodigo("MOU001"))
                .thenReturn(Optional.empty());

        when(repository.save(existente)).thenReturn(existente);

        Produto resultado = service.atualizar(1L, produto);

        assertEquals("Mouse Gamer", resultado.getNome());
        assertEquals("MOU001", resultado.getCodigo());

        verify(repository).save(existente);
    }

    @Test
    @DisplayName("Não deve atualizar produto inexistente")
    void naoDeveAtualizarProdutoInexistente() {
        when(repository.findById(99L))
                .thenReturn(Optional.empty());

        assertThrows(
                IllegalArgumentException.class,
                () -> service.atualizar(99L, produto)
        );

        verify(repository, never()).save(any());
    }

    @Test
    @DisplayName("Deve excluir um produto existente")
    void deveExcluirProduto() {
        Produto existente = new Produto();

        when(repository.findById(1L))
                .thenReturn(Optional.of(existente));

        service.excluir(1L);

        verify(repository).delete(existente);
    }

    @Test
    @DisplayName("Não deve excluir produto inexistente")
    void naoDeveExcluirProdutoInexistente() {
        when(repository.findById(99L))
                .thenReturn(Optional.empty());

        assertThrows(
                IllegalArgumentException.class,
                () -> service.excluir(99L)
        );

        verify(repository, never()).delete(any());
    }
}
