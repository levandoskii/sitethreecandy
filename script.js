// ========== LOGIN ==========
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    const nomeInput = document.getElementById('nome');
    const sobrenomeInput = document.getElementById('sobrenome');
    const turmaInput = document.getElementById('turma');
    const entregaSelect = document.getElementById('entrega');
    const manterLoginCheckbox = document.getElementById('manter-login');

    // Preenche automaticamente se login salvo
    if (localStorage.getItem('manterLogin') === 'true') {
      window.location.href = 'home.html';
    }

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = nomeInput.value;
      const sobrenome = sobrenomeInput.value;
      const turma = turmaInput.value;
      const entrega = entregaSelect.value;

      sessionStorage.setItem('nome', nome);
      sessionStorage.setItem('sobrenome', sobrenome);
      sessionStorage.setItem('turma', turma);
      sessionStorage.setItem('entrega', entrega);

      if (manterLoginCheckbox.checked) {
        localStorage.setItem('manterLogin', 'true');
      } else {
        localStorage.removeItem('manterLogin');
      }

      window.location.href = 'home.html';
    });
  }
});

// ========== CARRINHO ==========
let carrinho = [];

function alterarQuantidade(btn, delta) {
  const span = btn.parentElement.querySelector('span');
  let valor = parseInt(span.textContent);
  valor = Math.max(0, valor + delta);
  span.textContent = valor;
}

function adicionarCarrinho(botao) {
  const produto = botao.closest('.produto');
  const nome = produto.dataset.nome;
  const preco = parseFloat(produto.dataset.preco);
  const quantidade = parseInt(produto.querySelector('span').textContent);

  if (quantidade > 0) {
    const itemExistente = carrinho.find(item => item.nome === nome);
    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      carrinho.push({ nome, preco, quantidade });
    }

    produto.querySelector('span').textContent = '0';
    alert('Produto adicionado ao carrinho!');
  }
}

function abrirCarrinho() {
  const modal = document.getElementById('carrinho-modal');
  const lista = document.getElementById('lista-carrinho');
  const total = document.getElementById('total');

  lista.innerHTML = '';
  let precoFinal = 0;

  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `- ${item.nome}: ${item.quantidade} unidade(s)`;
    lista.appendChild(li);
    precoFinal += item.quantidade * item.preco;
  });

  total.textContent = `Total: R$ ${precoFinal.toFixed(2)}`;
  modal.style.display = 'flex';
}

function fecharCarrinho() {
  document.getElementById('carrinho-modal').style.display = 'none';
}

function finalizarPedido() {
  const nome = sessionStorage.getItem('nome') || '';
  const sobrenome = sessionStorage.getItem('sobrenome') || '';
  const turma = sessionStorage.getItem('turma') || '';
  const entrega = sessionStorage.getItem('entrega') || '';

  let mensagem = `Olá, tenho um pedido:\n`;
  let total = 0;

  carrinho.forEach(item => {
    mensagem += `- ${item.nome}: ${item.quantidade} unidade(s)\n`;
    total += item.quantidade * item.preco;
  });

  mensagem += `Total: R$ ${total.toFixed(2)}\n`;
  mensagem += `Nome: ${nome} ${sobrenome}\nTurma: ${turma}\nTipo de entrega: ${entrega}`;

  const encodedMsg = encodeURIComponent(mensagem);
  const numero = '5541996597922';
  window.open(`https://wa.me/${numero}?text=${encodedMsg}`, '_blank');
}

