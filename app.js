//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
let participantes = JSON.parse(localStorage.getItem('participantes')) || [];
let resultado = JSON.parse(localStorage.getItem('resultado')) || {};

function salvar() {
  localStorage.setItem('participantes', JSON.stringify(participantes));
  localStorage.setItem('resultado', JSON.stringify(resultado));
}

function adicionar() {
  const nome = document.getElementById('nome').value.trim();

  if (nome && !participantes.includes(nome)) {
    participantes.push(nome);
    document.getElementById('nome').value = '';
    atualizarLista();
    salvar();
  }
}

function atualizarLista() {
  const ul = document.getElementById('lista');
  ul.innerHTML = '';

  participantes.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p;
    ul.appendChild(li);
  });
}

function sortear() {
  if (participantes.length < 4) {
    alert('Adicione pelo menos 4 participantes!');
    return;
  }

  let sorteio = [...participantes];

  do {
    sorteio.sort(() => Math.random() - 0.5);
  } while (sorteio.some((p, i) => p === participantes[i]));

  resultado = {};

  participantes.forEach((p, i) => {
    resultado[p] = sorteio[i];
  });

  salvar();
  alert('Sorteio realizado!');
}

function verResultado() {
  const nome = document.getElementById('consulta').value;
  const amigo = resultado[nome];

  if (amigo) {
    document.getElementById('resposta').innerHTML = `
      🎁 Seu amigo secreto é: <strong>${amigo}</strong><br><br>
      <a href="https://wa.me/?text=Eu tirei você no amigo secreto!" target="_blank">WhatsApp</a><br>
      <a href="mailto:?subject=Amigo Secreto&body=Eu tirei você no amigo secreto!">Email</a>
    `;
  } else {
    document.getElementById('resposta').textContent =
      'Nome não encontrado ou sorteio não feito.';
  }
}

atualizarLista();
