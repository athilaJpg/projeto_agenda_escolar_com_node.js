# Web Agenda Escolar - Sistema web de agenda de contatos escolares com Node.js, Express e MySQL.
<img width="996" height="622" alt="image" src="https://github.com/user-attachments/assets/dfda05e2-c80c-43c6-944b-bff897015580" />

O que o sistema faz

Cadastra grupos (ex: Professores, Alunos, Fornecedores)
Cadastra contatos vinculados a esses grupos (nome, email, telefone)
Lista, edita e exclui grupos e contatos. (crud simples)

Tecnologias Utilizadas:

Back-end: Node.js + Express
Banco de dados: MySQL
Front-end: HTML, CSS e JavaScript

Como rodar?

1. Instalar dependências:
bashnpm install

2. Criar o banco de dados:

Abrir o MySQL Workbench e rodar:
sqlCREATE DATABASE agenda_escolar;
USE agenda_escolar;

CREATE TABLE grupos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL
);

CREATE TABLE contatos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150),
  telefone VARCHAR(20),
  grupo_id INT,
  FOREIGN KEY (grupo_id) REFERENCES grupos(id)
);

3. Configurar senha do banco:

Abrir o arquivo db.js e colocar a senha do MySQL:
jspassword: 'sua_senha_aqui', (colocar a senha de acesso inical)

4. Rodar o servidor:

bashnode server.js

5. E por fim Abrir no navegador.


Estrutura de pastas:

projeto/
├── server.js         → entrada da aplicação
├── db.js             → conexão com MySQL
├── routes/
│   ├── grupos.js     → CRUD de grupos
│   └── contatos.js   → CRUD de contatos
└── public/
    ├── index.html    → página principal
    ├── style.css     → estilos
    └── app.js        → JavaScript do front-end







