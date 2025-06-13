// Faz login e redireciona para a home
function login() {
  const nome = document.getElementById('nome').value;
  const sobrenome = document.getElementById('sobrenome').value;
  const turma = document.getElementById('turma').value;
  const entrega = document.getElementById('entrega').value;
  const manterLogado = document.getElementById('manter-logado').checked;

  if (!nome || !sobrenome || !turma || !entrega) {
    alert("Preencha todos os campos!");
    return;
  }

  const dados = {
    nome,
    sobrenome,
    turma,
    entrega
  };

  if (manterLogado) {
    localStorage.setItem('dadosUsuario', JSON.stringify(dados));
  } else {
    sessionStorage.setItem('dadosUsuario', JSON.stringify(dados));
  }

  window.location.href = "home.html";
}

// Verifica se o usuário está logado (usar no início do body de home e catalogo)
function getDadosUsuario() {
  return JSON.parse(localStorage.getItem('dadosUsuario') || sessionStorage.getItem('dadosUsuario'));
}

// Produtos e carrinho
const produtos = [
  { nome: "Bala Halls", preco: 3.50 },
  { nome: "Trident", preco: 4.50 },
  { nome: "Palha Italiana", preco: 7.00 }
];

let carrinho = [0, 0, 0];

function adicionar(index) {
  carrinho[index]++;
  atualizarProduto(index);
}

function remover(index) {
  if (carrinho[index] > 0) {
    carrinho[index]--;
    atualizarProduto(index);
  }
}

function atualizarProduto(index) {
  document.getElementById(`quantidade-${index}`).innerText = carrinho[index];
}

function abrirCarrinho() {
  const modal = document.getElementById("carrinho-modal");
  const lista = document.getElementById("lista-carrinho");
  const totalEl = document.getElementById("total");
  lista.innerHTML = "";

  let total = 0;
  produtos.forEach((produto, i) => {
    if (carrinho[i] > 0) {
      const subtotal = carrinho[i] * produto.preco;
      total += subtotal;
      const li = document.createElement("li");
      li.innerText = `- ${produto.nome}: ${carrinho[i]} unidade(s) - R$ ${subtotal.toFixed(2)}`;
      lista.appendChild(li);
    }
  });

  totalEl.innerText = `Total: R$ ${total.toFixed(2)}`;
  modal.style.display = "flex";
}

function fecharCarrinho() {
  document.getElementById("carrinho-modal").style.display = "none";
}

function finalizarPedido() {
  const dados = getDadosUsuario();
  if (!dados) {
    alert("Você precisa fazer login primeiro.");
    window.location.href = "login.html";
    return;
  }

  let mensagem = `Olá, tenho um pedido:%0A`;
  let total = 0;

  produtos.forEach((produto, i) => {
    if (carrinho[i] > 0) {
      const subtotal = carrinho[i] * produto.preco;
      total += subtotal;
      mensagem += `- ${produto.nome}: ${carrinho[i]} unidade(s)%0A`;
    }
  });

  mensagem += `Total: R$ ${total.toFixed(2)}%0A`;
  mensagem += `Nome: ${dados.nome} ${dados.sobrenome}%0A`;
  mensagem += `Turma: ${dados.turma}%0A`;
  mensagem += `Tipo de entrega: ${dados.entrega}`;

  const telefone = "5541996597922";
  const url = `https://wa.me/${telefone}?text=${mensagem}`;
  window.open(url, "_blank");
}
