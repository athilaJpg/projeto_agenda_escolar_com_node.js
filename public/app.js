// ──────────────────────────────────────────────
// GRUPOS
// ──────────────────────────────────────────────
async function carregarGrupos() {
  const res = await fetch('/grupos');
  const grupos = await res.json();

  // Preenche lista na tela
  const lista = document.getElementById('listaGrupos');
  lista.innerHTML = '';
  grupos.forEach(g => {
    lista.innerHTML += `
      <li>
        ${g.nome}
        <button onclick="deletarGrupo(${g.id})">Excluir</button>
      </li>`;
  });

  // Preenche o <select> de grupos no formulário de contatos
  const select = document.getElementById('grupoContato');
  select.innerHTML = '<option value="">Sem grupo</option>';
  grupos.forEach(g => {
    select.innerHTML += `<option value="${g.id}">${g.nome}</option>`;
  });
}

async function criarGrupo() {
  const nome = document.getElementById('nomeGrupo').value;
  await fetch('/grupos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome })
  });
  carregarGrupos();
}

async function deletarGrupo(id) {
  await fetch(`/grupos/deletar/${id}`, { method: 'POST' });
  carregarGrupos();
}

// ──────────────────────────────────────────────
// CONTATOS
// ──────────────────────────────────────────────
async function carregarContatos() {
  const res = await fetch('/contatos');
  const contatos = await res.json();

  const lista = document.getElementById('listaContatos');
  lista.innerHTML = '';
  contatos.forEach(c => {
    lista.innerHTML += `
      <li>
        <strong>${c.nome}</strong> — ${c.email} — ${c.telefone}
        (${c.grupo_nome || 'Sem grupo'})
        <button onclick="deletarContato(${c.id})">Excluir</button>
      </li>`;
  });
}

async function criarContato() {
  const nome = document.getElementById('nomeContato').value;
  const email = document.getElementById('emailContato').value;
  const telefone = document.getElementById('telefoneContato').value;
  const grupo_id = document.getElementById('grupoContato').value || null;

  await fetch('/contatos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, telefone, grupo_id })
  });
  carregarContatos();
}

async function deletarContato(id) {
  await fetch(`/contatos/deletar/${id}`, { method: 'POST' });
  carregarContatos();
}

// Carrega tudo ao abrir a página
carregarGrupos();
carregarContatos();