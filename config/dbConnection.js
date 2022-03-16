const mysql = require('mysql2');
require('dotenv').config();

let pool;
pool = mysql.createPool({
  connectionLimit : 10,
  host     : process.env.BC_HOST || 'localhost',
  user     : process.env.BC_USER || 'root',
  password : process.env.BC_PASSWORD || '#Root2022',
  database : process.env.BC_DATABASE || 'bicom2',
  multipleStatements: true
});

module.exports = pool;


//connection.end();  <--- Finaliza la conexion.
