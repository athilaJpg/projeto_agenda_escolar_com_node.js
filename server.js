const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const gruposRoutes = require('./routes/grupos');
const contatosRoutes = require('./routes/contatos');

app.use('/grupos', gruposRoutes);
app.use('/contatos', contatosRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});