
package br.com.stocktech.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "produtos")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome do produto é obrigatório")
    @Size(max = 120)
    @Column(nullable = false, length = 120)
    private String nome;

    @NotBlank(message = "O código do produto é obrigatório")
    @Column(nullable = false, unique = true, length = 50)
    private String codigo;

    @Size(max = 255)
    private String descricao;

    @NotNull(message = "O preço de custo é obrigatório")
    @DecimalMin(value = "0.0")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precoCusto;

    @NotNull(message = "O preço de venda é obrigatório")
    @DecimalMin(value = "0.0")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precoVenda;

    @NotNull(message = "A quantidade é obrigatória")
    @PositiveOrZero
    @Column(nullable = false)
    private Integer quantidadeAtual;

    @NotNull(message = "O estoque mínimo é obrigatório")
    @PositiveOrZero
    @Column(nullable = false)
    private Integer estoqueMinimo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    @ManyToOne(optional = false)
    @JoinColumn(name = "fornecedor_id", nullable = false)
    private Fornecedor fornecedor;

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public BigDecimal getPrecoCusto() { return precoCusto; }
    public void setPrecoCusto(BigDecimal precoCusto) { this.precoCusto = precoCusto; }
    public BigDecimal getPrecoVenda() { return precoVenda; }
    public void setPrecoVenda(BigDecimal precoVenda) { this.precoVenda = precoVenda; }
    public Integer getQuantidadeAtual() { return quantidadeAtual; }
    public void setQuantidadeAtual(Integer quantidadeAtual) { this.quantidadeAtual = quantidadeAtual; }
    public Integer getEstoqueMinimo() { return estoqueMinimo; }
    public void setEstoqueMinimo(Integer estoqueMinimo) { this.estoqueMinimo = estoqueMinimo; }
    public Categoria getCategoria() { return categoria; }
    public void setCategoria(Categoria categoria) { this.categoria = categoria; }
    public Fornecedor getFornecedor() { return fornecedor; }
    public void setFornecedor(Fornecedor fornecedor) { this.fornecedor = fornecedor; }
}
