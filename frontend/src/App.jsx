
import { useEffect, useState } from 'react';
import { House, Package, Tags, Truck, Boxes } from 'lucide-react';
import './App.css';

const API = 'http://localhost:8080/api';

const produtoVazio = {
  nome: '',
  codigo: '',
  descricao: '',
  precoCusto: '',
  precoVenda: '',
  quantidadeAtual: '',
  estoqueMinimo: '',
  categoriaId: '',
  fornecedorId: ''
};

function App() {
  const [pagina, setPagina] = useState('inicio');
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [produtoEditando, setProdutoEditando] = useState(null);

  const [produto, setProduto] = useState(produtoVazio);

  const [categoria, setCategoria] = useState({
    nome: '',
    descricao: ''
  });

  const [fornecedor, setFornecedor] = useState({
    nome: '',
    cnpj: '',
    telefone: '',
    email: ''
  });

  const menu = [
    { id: 'inicio', nome: 'Visão geral', icone: House },
    { id: 'produtos', nome: 'Produtos', icone: Package },
    { id: 'categorias', nome: 'Categorias', icone: Tags },
    { id: 'fornecedores', nome: 'Fornecedores', icone: Truck }
  ];

  const paginaAtual = menu.find(item => item.id === pagina);

  async function carregarDados() {
    try {
      const [resProdutos, resCategorias, resFornecedores] =
        await Promise.all([
          fetch(`${API}/produtos`),
          fetch(`${API}/categorias`),
          fetch(`${API}/fornecedores`)
        ]);

      if (!resProdutos.ok || !resCategorias.ok || !resFornecedores.ok) {
        throw new Error('Não foi possível carregar os dados da API.');
      }

      const dadosProdutos = await resProdutos.json();
      const dadosCategorias = await resCategorias.json();
      const dadosFornecedores = await resFornecedores.json();

      setProdutos(dadosProdutos);
      setCategorias(dadosCategorias);
      setFornecedores(dadosFornecedores);
      setErro('');
    } catch (error) {
      setErro('Erro ao conectar com o servidor. Confira se o Spring Boot está rodando.');
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function mostrarMensagem(texto) {
    setMensagem(texto);
    setErro('');
  }

  function iniciarEdicao(item) {
    setProdutoEditando(item.id);

    setProduto({
      nome: item.nome || '',
      codigo: item.codigo || '',
      descricao: item.descricao || '',
      precoCusto: item.precoCusto ?? '',
      precoVenda: item.precoVenda ?? '',
      quantidadeAtual: item.quantidadeAtual ?? '',
      estoqueMinimo: item.estoqueMinimo ?? '',
      categoriaId: item.categoria?.id || '',
      fornecedorId: item.fornecedor?.id || ''
    });

    setMensagem('');
    setErro('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  function cancelarEdicao() {
    setProdutoEditando(null);
    setProduto(produtoVazio);
    setMensagem('');
    setErro('');
  }

  async function cadastrarProduto(event) {
    event.preventDefault();

    const dados = {
      nome: produto.nome,
      codigo: produto.codigo,
      descricao: produto.descricao,
      precoCusto: Number(produto.precoCusto),
      precoVenda: Number(produto.precoVenda),
      quantidadeAtual: Number(produto.quantidadeAtual),
      estoqueMinimo: Number(produto.estoqueMinimo),
      categoria: { id: Number(produto.categoriaId) },
      fornecedor: { id: Number(produto.fornecedorId) }
    };

    try {
      const resposta = await fetch(
        produtoEditando
          ? `${API}/produtos/${produtoEditando}`
          : `${API}/produtos`,
        {
          method: produtoEditando ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dados)
        }
      );

      if (!resposta.ok) {
        const texto = await resposta.text();
        throw new Error(texto || 'Não foi possível salvar o produto.');
      }

      const estavaEditando = produtoEditando !== null;

      setProduto(produtoVazio);
      setProdutoEditando(null);

      await carregarDados();

      mostrarMensagem(
        estavaEditando
          ? 'Produto atualizado com sucesso!'
          : 'Produto cadastrado com sucesso!'
      );

    } catch (error) {
      setErro(error.message);
      setMensagem('');
    }
  }

  async function excluirProduto(id) {
    if (!window.confirm('Deseja realmente excluir este produto?')) {
      return;
    }

    try {
      const resposta = await fetch(`${API}/produtos/${id}`, {
        method: 'DELETE'
      });

      if (!resposta.ok) {
        throw new Error('Não foi possível excluir o produto.');
      }

      await carregarDados();
      mostrarMensagem('Produto excluído com sucesso!');

    } catch (error) {
      setErro(error.message);
      setMensagem('');
    }
  }

  async function cadastrarCategoria(event) {
    event.preventDefault();

    try {
      const resposta = await fetch(`${API}/categorias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoria)
      });

      if (!resposta.ok) {
        const texto = await resposta.text();
        throw new Error(texto || 'Não foi possível cadastrar a categoria.');
      }

      setCategoria({
        nome: '',
        descricao: ''
      });

      await carregarDados();
      mostrarMensagem('Categoria cadastrada com sucesso!');

    } catch (error) {
      setErro(error.message);
      setMensagem('');
    }
  }

  async function cadastrarFornecedor(event) {
    event.preventDefault();

    try {
      const resposta = await fetch(`${API}/fornecedores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fornecedor)
      });

      if (!resposta.ok) {
        const texto = await resposta.text();
        throw new Error(texto || 'Não foi possível cadastrar o fornecedor.');
      }

      setFornecedor({
        nome: '',
        cnpj: '',
        telefone: '',
        email: ''
      });

      await carregarDados();
      mostrarMensagem('Fornecedor cadastrado com sucesso!');

    } catch (error) {
      setErro(error.message);
      setMensagem('');
    }
  }

  return (
    <div className="layout">

      <aside className="sidebar">

        <div className="logo">
          <span className="logo-icon">
            <Boxes size={25} />
          </span>

          <div>
            <h2>StockTech</h2>
            <small>Controle de estoque</small>
          </div>
        </div>

        <p className="menu-title">MENU PRINCIPAL</p>

        <nav>
          {menu.map((item) => {
            const Icone = item.icone;

            return (
              <button
                key={item.id}
                className={
                  pagina === item.id
                    ? 'menu-item ativo'
                    : 'menu-item'
                }
                onClick={() => setPagina(item.id)}
              >
                <span className="menu-icon">
                  <Icone size={19} strokeWidth={1.8} />
                </span>

                {item.nome}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <strong>StockTech</strong>
          <small>Sistema de gerenciamento</small>
        </div>

      </aside>

      <main className="conteudo">

        <header className="topbar">
          <div>
            <h1>{paginaAtual?.nome}</h1>
            <p>Bem-vindo ao sistema StockTech</p>
          </div>

          <span className="usuario">
            Administrador
          </span>
        </header>

        {mensagem && (
          <div className="mensagem-sucesso">
            {mensagem}
          </div>
        )}

        {erro && (
          <div className="mensagem-erro">
            {erro}
          </div>
        )}

        {pagina === 'inicio' && (
          <>
            <section className="boas-vindas">
              <div>
                <h2>Controle seu estoque com facilidade.</h2>
                <p>
                  Gerencie produtos, categorias e fornecedores
                  em um só lugar.
                </p>
              </div>

              <Boxes size={55} strokeWidth={1.5} />
            </section>

            <section className="cards">

              <div className="card">
                <span>Produtos cadastrados</span>
                <strong>{produtos.length}</strong>
                <small>Produtos registrados no sistema</small>
              </div>

              <div className="card">
                <span>Categorias</span>
                <strong>{categorias.length}</strong>
                <small>Categorias cadastradas</small>
              </div>

              <div className="card">
                <span>Fornecedores</span>
                <strong>{fornecedores.length}</strong>
                <small>Fornecedores cadastrados</small>
              </div>

            </section>

            <section className="painel">
              <h2>Acesso rápido</h2>

              <p>
                Escolha uma área para começar a gerenciar seu estoque.
              </p>

              <div className="atalhos">
                <button onClick={() => setPagina('produtos')}>
                  Consultar produtos
                </button>

                <button onClick={() => setPagina('categorias')}>
                  Consultar categorias
                </button>

                <button onClick={() => setPagina('fornecedores')}>
                  Consultar fornecedores
                </button>
              </div>
            </section>
          </>
        )}

        {pagina === 'produtos' && (
          <>
            <section className="painel">

              <h2>
                {produtoEditando
                  ? 'Editar produto'
                  : 'Cadastrar produto'}
              </h2>

              <form
                className="formulario"
                onSubmit={cadastrarProduto}
              >

                <input
                  placeholder="Nome do produto"
                  value={produto.nome}
                  onChange={e =>
                    setProduto({
                      ...produto,
                      nome: e.target.value
                    })
                  }
                  required
                />

                <input
                  placeholder="Código"
                  value={produto.codigo}
                  onChange={e =>
                    setProduto({
                      ...produto,
                      codigo: e.target.value
                    })
                  }
                  required
                />

                <input
                  placeholder="Descrição"
                  value={produto.descricao}
                  onChange={e =>
                    setProduto({
                      ...produto,
                      descricao: e.target.value
                    })
                  }
                />

                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Preço de custo"
                  value={produto.precoCusto}
                  onChange={e =>
                    setProduto({
                      ...produto,
                      precoCusto: e.target.value
                    })
                  }
                  required
                />

                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Preço de venda"
                  value={produto.precoVenda}
                  onChange={e =>
                    setProduto({
                      ...produto,
                      precoVenda: e.target.value
                    })
                  }
                  required
                />

                <input
                  type="number"
                  min="0"
                  placeholder="Quantidade atual"
                  value={produto.quantidadeAtual}
                  onChange={e =>
                    setProduto({
                      ...produto,
                      quantidadeAtual: e.target.value
                    })
                  }
                  required
                />

                <input
                  type="number"
                  min="0"
                  placeholder="Estoque mínimo"
                  value={produto.estoqueMinimo}
                  onChange={e =>
                    setProduto({
                      ...produto,
                      estoqueMinimo: e.target.value
                    })
                  }
                  required
                />

                <select
                  value={produto.categoriaId}
                  onChange={e =>
                    setProduto({
                      ...produto,
                      categoriaId: e.target.value
                    })
                  }
                  required
                >
                  <option value="">
                    Selecione uma categoria
                  </option>

                  {categorias.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.nome}
                    </option>
                  ))}
                </select>

                <select
                  value={produto.fornecedorId}
                  onChange={e =>
                    setProduto({
                      ...produto,
                      fornecedorId: e.target.value
                    })
                  }
                  required
                >
                  <option value="">
                    Selecione um fornecedor
                  </option>

                  {fornecedores.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.nome}
                    </option>
                  ))}
                </select>

                <button type="submit">
                  {produtoEditando
                    ? 'Salvar alterações'
                    : 'Cadastrar produto'}
                </button>

                {produtoEditando && (
                  <button
                    type="button"
                    className="botao-cancelar"
                    onClick={cancelarEdicao}
                  >
                    Cancelar edição
                  </button>
                )}

              </form>
            </section>

            <section className="painel">

              <h2>Produtos cadastrados</h2>

              {produtos.length === 0 ? (
                <p>Nenhum produto cadastrado até o momento.</p>
              ) : (
                <div className="tabela-container">

                  <table className="tabela">

                    <thead>
                      <tr>
                        <th>Produto</th>
                        <th>Código</th>
                        <th>Categoria</th>
                        <th>Fornecedor</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Ação</th>
                      </tr>
                    </thead>

                    <tbody>
                      {produtos.map(item => (
                        <tr key={item.id}>

                          <td>{item.nome}</td>
                          <td>{item.codigo}</td>
                          <td>{item.categoria?.nome}</td>
                          <td>{item.fornecedor?.nome}</td>
                          <td>{item.quantidadeAtual}</td>

                          <td>
                            {Number(item.precoVenda).toLocaleString(
                              'pt-BR',
                              {
                                style: 'currency',
                                currency: 'BRL'
                              }
                            )}
                          </td>

                          <td>
                            <button
                              className="botao-editar"
                              onClick={() => iniciarEdicao(item)}
                            >
                              Editar
                            </button>

                            <button
                              className="botao-excluir"
                              onClick={() => excluirProduto(item.id)}
                            >
                              Excluir
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>

                  </table>

                </div>
              )}

            </section>
          </>
        )}

        {pagina === 'categorias' && (
          <>
            <section className="painel">

              <h2>Cadastrar categoria</h2>

              <form
                className="formulario"
                onSubmit={cadastrarCategoria}
              >

                <input
                  placeholder="Nome da categoria"
                  value={categoria.nome}
                  onChange={e =>
                    setCategoria({
                      ...categoria,
                      nome: e.target.value
                    })
                  }
                  required
                />

                <input
                  placeholder="Descrição"
                  value={categoria.descricao}
                  onChange={e =>
                    setCategoria({
                      ...categoria,
                      descricao: e.target.value
                    })
                  }
                />

                <button type="submit">
                  Cadastrar categoria
                </button>

              </form>

            </section>

            <section className="painel">

              <h2>Categorias cadastradas</h2>

              {categorias.length === 0 ? (
                <p>Nenhuma categoria cadastrada.</p>
              ) : (
                <ul className="lista-registros">

                  {categorias.map(item => (
                    <li key={item.id}>
                      <strong>{item.nome}</strong>
                      <span>{item.descricao}</span>
                    </li>
                  ))}

                </ul>
              )}

            </section>
          </>
        )}

        {pagina === 'fornecedores' && (
          <>
            <section className="painel">

              <h2>Cadastrar fornecedor</h2>

              <form
                className="formulario"
                onSubmit={cadastrarFornecedor}
              >

                <input
                  placeholder="Nome do fornecedor"
                  value={fornecedor.nome}
                  onChange={e =>
                    setFornecedor({
                      ...fornecedor,
                      nome: e.target.value
                    })
                  }
                  required
                />

                <input
                  placeholder="CNPJ"
                  value={fornecedor.cnpj}
                  onChange={e =>
                    setFornecedor({
                      ...fornecedor,
                      cnpj: e.target.value
                    })
                  }
                  required
                />

                <input
                  placeholder="Telefone"
                  value={fornecedor.telefone}
                  onChange={e =>
                    setFornecedor({
                      ...fornecedor,
                      telefone: e.target.value
                    })
                  }
                />

                <input
                  type="email"
                  placeholder="E-mail"
                  value={fornecedor.email}
                  onChange={e =>
                    setFornecedor({
                      ...fornecedor,
                      email: e.target.value
                    })
                  }
                />

                <button type="submit">
                  Cadastrar fornecedor
                </button>

              </form>

            </section>

            <section className="painel">

              <h2>Fornecedores cadastrados</h2>

              {fornecedores.length === 0 ? (
                <p>Nenhum fornecedor cadastrado.</p>
              ) : (
                <ul className="lista-registros">

                  {fornecedores.map(item => (
                    <li key={item.id}>
                      <strong>{item.nome}</strong>
                      <span>CNPJ: {item.cnpj}</span>
                      <span>{item.email}</span>
                      <span>{item.telefone}</span>
                    </li>
                  ))}

                </ul>
              )}

            </section>
          </>
        )}

      </main>
    </div>
  );
}

export default App;
