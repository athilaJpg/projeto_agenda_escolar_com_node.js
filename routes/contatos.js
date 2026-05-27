const express = require('express');
const router = express.Router();
const db = require('../db');

// READ - listar todos (com nome do grupo)
router.get('/', (req, res) => {
  const sql = `
    SELECT contatos.*, grupos.nome AS grupo_nome
    FROM contatos
    LEFT JOIN grupos ON contatos.grupo_id = grupos.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
});

// READ - buscar por ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM contatos WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results[0]);
  });
});

// CREATE
router.post('/', (req, res) => {
  const { nome, email, telefone, grupo_id } = req.body;
  db.query(
    'INSERT INTO contatos (nome, email, telefone, grupo_id) VALUES (?, ?, ?, ?)',
    [nome, email, telefone, grupo_id],
    (err, result) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ id: result.insertId, nome });
    }
  );
});

// UPDATE
router.post('/editar/:id', (req, res) => {
  const { nome, email, telefone, grupo_id } = req.body;
  db.query(
    'UPDATE contatos SET nome=?, email=?, telefone=?, grupo_id=? WHERE id=?',
    [nome, email, telefone, grupo_id, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ mensagem: 'Contato atualizado!' });
    }
  );
});

// DELETE
router.post('/deletar/:id', (req, res) => {
  db.query('DELETE FROM contatos WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Contato removido!' });
  });
});

module.exports = router;