const loginPage = document.getElementById('loginPage');
const homePage = document.getElementById('homePage');
const catalogoPage = document.getElementById('catalogoPage');
const carrinhoEl = document.getElementById('itensCarrinho');
const precoTotalEl = document.getElementById('precoTotal');

let carrinho = [];

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const sobrenome = document.getElementById('sobrenome').value;
  const turma = document.getElementById('turma').value;
  const tipoEntrega = document.getElementById('tipoEntrega').value;
  const manter = document.getElementById('manterLogado').checked;

  const dados = { nome, sobrenome, turma, tipoEntrega };
  if (manter) localStorage.setItem('usuario', JSON.stringify(dados));

  loginPage.classList.add('hidden');
  homePage.classList.remove('hidden');
});

function irParaCatalogo() {
  homePage.classList.add('hidden');
  catalogoPage.classList.remove('hidden');
}

function alterarQuantidade(item, delta) {
  const el = document.getElementById(`qtd-${item}`);
  let valor = parseInt(el.textContent) + delta;
  if (valor < 0) valor = 0;
  el.textContent = valor;
}

function adicionarAoCarrinho(nome, preco, idQtd) {
  const qtd = parseInt(document.getElementById(idQtd).textContent);
  if (qtd > 0) {
    carrinho.push({ nome, preco, qtd });
    atualizarCarrinho();
  }
}

function atualizarCarrinho() {
  carrinhoEl.innerHTML = '';
  let total = 0;
  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.qtd}x ${item.nome} - R$ ${(item.preco * item.qtd).toFixed(2)}`;
    carrinhoEl.appendChild(li);
    total += item.preco * item.qtd;
  });
  precoTotalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function finalizarCompra() {
  const dados = JSON.parse(localStorage.getItem('usuario')) || {
    nome: document.getElementById('nome').value,
    sobrenome: document.getElementById('sobrenome').value,
    turma: document.getElementById('turma').value,
    tipoEntrega: document.getElementById('tipoEntrega').value
  };

  const msg = `Olá! Meu nome é ${dados.nome} ${dados.sobrenome}, da turma ${dados.turma}. Tipo de entrega: ${dados.tipoEntrega}.\\n\\nItens:\\n` + 
    carrinho.map(i => `${i.qtd}x ${i.nome}`).join('\\n') + 
    `\\n\\nTotal: ${precoTotalEl.textContent}`;

  const link = `https://wa.me/5541996597922?text=${encodeURIComponent(msg)}`;
  window.open(link, '_blank');
}

// Auto-login
window.onload = () => {
  const user = localStorage.getItem('usuario');
  if (user) {
    loginPage.classList.add('hidden');
    homePage.classList.remove('hidden');
  }
};

