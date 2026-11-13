
CREATE DATABASE IF NOT EXISTS stocktech
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE stocktech;

-- Tabela de categorias
CREATE TABLE IF NOT EXISTS categorias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) NOT NULL UNIQUE,
    descricao VARCHAR(255)
);

-- Tabela de fornecedores
CREATE TABLE IF NOT EXISTS fornecedores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(120)
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    descricao VARCHAR(255),
    preco_custo DECIMAL(10,2) NOT NULL,
    preco_venda DECIMAL(10,2) NOT NULL,
    quantidade_atual INT NOT NULL,
    estoque_minimo INT NOT NULL,
    categoria_id BIGINT NOT NULL,
    fornecedor_id BIGINT NOT NULL,

    CONSTRAINT fk_produto_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(id),

    CONSTRAINT fk_produto_fornecedor
        FOREIGN KEY (fornecedor_id)
        REFERENCES fornecedores(id),

    CONSTRAINT chk_preco_custo
        CHECK (preco_custo >= 0),

    CONSTRAINT chk_preco_venda
        CHECK (preco_venda >= preco_custo),

    CONSTRAINT chk_quantidade
        CHECK (quantidade_atual >= 0),

    CONSTRAINT chk_estoque_minimo
        CHECK (estoque_minimo >= 0)
);

