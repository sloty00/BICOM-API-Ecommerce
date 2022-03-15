var mysql = require('mysql2');
var pool  = mysql.createPool({
    connectionLimit : 10,
    host: "localhost",
    user: "root",
    password: "#Root2022",
    database: "bicom2",
    multipleStatements: true
  });

module.exports = pool;