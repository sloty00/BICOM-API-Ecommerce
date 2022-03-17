const mysql = require('mysql2');
require('dotenv').config();

let pool;
pool = mysql.createPool({
  connectionLimit : 10,
  host     : process.env.BC_HOST_MYSQL_1,
  user     : process.env.BC_USER_MYSQL_1,
  password : process.env.BC_PASSWORD_MYSQL_1,
  database : process.env.BC_DATABASE_MYSQL_1,
  multipleStatements: true
});

module.exports = pool;


//connection.end();  <--- Finaliza la conexion.
