const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ifsp',
  database: 'agenda_escolar'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL conectado!');
});

module.exports = db;