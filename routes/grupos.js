const express = require('express');
const router = express.Router();
const db = require('../db');

// READ - listar todos
router.get('/', (req, res) => {
  db.query('SELECT * FROM grupos', (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
});

// READ - buscar por ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM grupos WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results[0]);
  });
});

// CREATE
router.post('/', (req, res) => {
  const { nome } = req.body;
  db.query('INSERT INTO grupos (nome) VALUES (?)', [nome], (err, result) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ id: result.insertId, nome });
  });
});

// UPDATE
router.post('/editar/:id', (req, res) => {
  const { nome } = req.body;
  db.query('UPDATE grupos SET nome = ? WHERE id = ?', [nome, req.params.id], (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Grupo atualizado!' });
  });
});

// DELETE
router.post('/deletar/:id', (req, res) => {
  db.query('DELETE FROM grupos WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Grupo removido!' });
  });
});

module.exports = router;