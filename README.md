# StockTech – Sistema de Gerenciamento de Estoque

## 1. Apresentação

O StockTech é um sistema desenvolvido para auxiliar no gerenciamento de estoque de uma loja de informática. Seu objetivo é facilitar o cadastro, a organização e o acompanhamento dos produtos, permitindo controlar informações como preços, quantidades disponíveis, categorias e fornecedores.

O sistema foi desenvolvido como atividade acadêmica do curso de Análise e Desenvolvimento de Sistemas, utilizando conceitos de programação orientada a objetos, desenvolvimento de APIs REST, persistência de dados e integração entre frontend e backend.

## 2. Objetivo do projeto

O principal objetivo do StockTech é oferecer uma solução para organizar o estoque de uma loja de informática, facilitando o gerenciamento dos produtos e reduzindo problemas relacionados ao controle manual das informações.

A aplicação permite cadastrar produtos, relacioná-los com categorias e fornecedores, consultar informações e realizar alterações nos registros.

## 3. Tecnologias utilizadas

### Backend
- Java 26
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- Maven

### Frontend
- ReactJS
- JavaScript
- Vite
- CSS
- Lucide React

### Banco de dados
- MySQL 8.0

### Testes automatizados
- JUnit 5
- Mockito

### Ferramentas utilizadas
- Visual Studio Code
- MySQL Workbench
- Postman
- Git e GitHub

## 4. Funcionalidades do sistema

O StockTech possui as seguintes funcionalidades:

- Cadastro e consulta de categorias.
- Edição e exclusão de categorias.
- Cadastro e consulta de fornecedores.
- Cadastro de produtos.
- Consulta e listagem de produtos.
- Edição de produtos cadastrados.
- Exclusão de produtos.
- Associação de produtos com suas respectivas categorias e fornecedores.
- Controle da quantidade atual em estoque.
- Definição de estoque mínimo.
- Visualização de informações gerais no painel inicial.

## 5. Regras de negócio

O sistema possui regras de negócio para evitar inconsistências no cadastro e no gerenciamento dos produtos.

As principais regras implementadas são:

1. Não permitir o cadastro de produtos com códigos duplicados.
2. Não permitir que a quantidade atual em estoque seja negativa.
3. Não permitir que o preço de venda seja menor que o preço de custo.
4. Não permitir que o estoque mínimo seja negativo.
5. Exigir que cada produto esteja associado a uma categoria e a um fornecedor.
6. Não permitir valores negativos para o preço de custo.

Essas validações são realizadas na aplicação e também reforçadas por restrições no banco de dados.

## 6. Modelagem do banco de dados

O banco de dados do StockTech foi desenvolvido utilizando o MySQL e possui três entidades principais: Categoria, Fornecedor e Produto.

### Categoria

Armazena as categorias utilizadas para organizar os produtos da loja.

Atributos:
- `id`: chave primária.
- `nome`: nome da categoria.
- `descricao`: descrição da categoria.

### Fornecedor

Armazena os dados dos fornecedores responsáveis pelo fornecimento dos produtos.

Atributos:
- `id`: chave primária.
- `nome`: nome do fornecedor.
- `cnpj`: CNPJ do fornecedor.
- `telefone`: telefone de contato.
- `email`: endereço de e-mail.

### Produto

Armazena as informações dos produtos cadastrados no estoque.

Atributos:
- `id`: chave primária.
- `nome`: nome do produto.
- `codigo`: código único do produto.
- `descricao`: descrição do produto.
- `preco_custo`: preço de aquisição.
- `preco_venda`: preço de venda.
- `quantidade_atual`: quantidade disponível em estoque.
- `estoque_minimo`: quantidade mínima definida para o produto.
- `categoria_id`: chave estrangeira relacionada à categoria.
- `fornecedor_id`: chave estrangeira relacionada ao fornecedor.

### Relacionamentos e cardinalidades

O banco possui os seguintes relacionamentos:

- Categoria (1:N) Produto: uma categoria pode possuir vários produtos, mas cada produto pertence a uma categoria.
- Fornecedor (1:N) Produto: um fornecedor pode fornecer vários produtos, mas cada produto está associado a um fornecedor.

As relações são implementadas no Java utilizando JPA, por meio de `@ManyToOne`, e no MySQL por meio de chaves estrangeiras.

## 7. Estrutura do projeto

O projeto está organizado em duas partes principais: backend e frontend.

```text
stocktech/
│
├── database/
│   └── schema.sql
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── br/com/stocktech/
│   │   │       ├── config/
│   │   │       ├── controller/
│   │   │       ├── domain/
│   │   │       ├── dto/
│   │   │       ├── enums/
│   │   │       ├── exception/
│   │   │       ├── repository/
│   │   │       ├── service/
│   │   │       └── StocktechApplication.java
│   │   │
│   │   └── resources/
│   │       └── application.properties
│   │
│   └── test/
│       └── java/
│           └── br/com/stocktech/
│               ├── service/
│               │   └── ProdutoServiceTest.java
│               └── StocktechApplicationTests.java
│
├── pom.xml
└── README.md
```

### Organização do backend

O backend utiliza uma arquitetura em camadas, separando as responsabilidades:

- **Controller:** responsável por receber as requisições HTTP e disponibilizar os endpoints da API.
- **Service:** responsável por coordenar as operações e aplicar as regras de negócio.
- **Domain:** contém as entidades principais da aplicação.
- **Repository:** responsável pelo acesso e persistência dos dados utilizando Spring Data JPA.
- **DTO:** utilizado para transportar dados entre as requisições e respostas da API.
- **Config:** contém configurações necessárias para o funcionamento da aplicação.
- **Exception:** responsável pelo tratamento de erros e exceções.

## 8. Configuração do banco de dados

O StockTech utiliza o MySQL 8.0 como sistema gerenciador de banco de dados.

### Como criar o banco

1. Instale o MySQL Server.
2. Instale e abra o MySQL Workbench.
3. Conecte-se ao servidor MySQL.
4. Abra o arquivo `database/schema.sql`.
5. Execute o script SQL.
6. Verifique se o banco de dados `stocktech` e suas três tabelas foram criados.

O script contém a criação das tabelas, chaves primárias, chaves estrangeiras e restrições de integridade.

### Configuração da conexão

No arquivo `src/main/resources/application.properties`, configure a conexão com o banco:

```properties
spring.application.name=stocktech

spring.datasource.url=jdbc:mysql://localhost:3306/stocktech?useSSL=false&serverTimezone=America/Sao_Paulo&allowPublicKeyRetrieval=true

spring.datasource.username=root
spring.datasource.password=SUA_SENHA_DO_MYSQL

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

server.port=8080
```

Substitua `SUA_SENHA_DO_MYSQL` pela senha configurada no MySQL Server do computador utilizado.

**Importante:** não compartilhe senhas reais ou credenciais pessoais no repositório.

## 9. Como executar o backend

### Pré-requisitos

- Java 26.
- MySQL Server instalado e em execução.
- Banco de dados `stocktech` criado.
- Maven Wrapper disponível no projeto.

### Executando a aplicação

Abra o terminal na pasta principal do projeto, onde está localizado o arquivo `pom.xml`, e execute:

```powershell
.\mvnw.cmd spring-boot:run
```

Após a inicialização, o backend estará disponível em:

`http://localhost:8080`

## 10. Como executar o frontend

### Pré-requisitos

- Node.js instalado.
- npm disponível.

Abra outro terminal e acesse a pasta do frontend:

```powershell
cd frontend
```

Instale as dependências:

```powershell
npm.cmd install
```

Inicie a aplicação:

```powershell
npm.cmd run dev
```

O frontend estará disponível no endereço:

`http://localhost:5173`

O backend deverá permanecer em execução para que o frontend consiga realizar as operações com a API.

## 11. Endpoints principais da API

A API REST disponibiliza endpoints para o gerenciamento das informações.

### Categorias

| Método HTTP | Endpoint | Operação |
|---|---|---|
| POST | `/api/categorias` | Cadastrar categoria |
| GET | `/api/categorias` | Listar categorias |
| PUT | `/api/categorias/{id}` | Atualizar categoria |
| DELETE | `/api/categorias/{id}` | Excluir categoria |

### Fornecedores

| Método HTTP | Endpoint | Operação |
|---|---|---|
| POST | `/api/fornecedores` | Cadastrar fornecedor |
| GET | `/api/fornecedores` | Listar fornecedores |

### Produtos

| Método HTTP | Endpoint | Operação |
|---|---|---|
| POST | `/api/produtos` | Cadastrar produto |
| GET | `/api/produtos` | Listar produtos |
| PUT | `/api/produtos/{id}` | Atualizar produto |
| DELETE | `/api/produtos/{id}` | Excluir produto |

## 12. Testes automatizados

O projeto utiliza JUnit 5 e Mockito para realizar testes automatizados das regras de negócio.

Os testes verificam situações como:

- Cadastro de produto válido.
- Impedimento de códigos duplicados.
- Impedimento de preço de venda inferior ao preço de custo.
- Impedimento de quantidade negativa.
- Impedimento de estoque mínimo negativo.
- Atualização de produtos.
- Tratamento de produto não encontrado.
- Exclusão de produtos.

### Como executar os testes

Na pasta principal do projeto, execute:

```powershell
.\mvnw.cmd clean test
```

Durante o desenvolvimento, foram executados 10 testes automatizados, sem falhas ou erros.

## 13. Considerações finais

O desenvolvimento do StockTech permitiu colocar em prática os conhecimentos adquiridos durante o curso, trabalhando com programação orientada a objetos, arquitetura em camadas, desenvolvimento de APIs REST, banco de dados relacional, persistência com JPA, integração entre frontend e backend e testes automatizados.

O projeto busca apresentar uma solução funcional para o gerenciamento de estoque de uma loja de informática, utilizando tecnologias atuais e aplicando regras de negócio para manter a consistência das informações.

## 14. Desenvolvedores do projeto

- Mateus Henrique Barros Presner
- Matheus Borges de Avila
