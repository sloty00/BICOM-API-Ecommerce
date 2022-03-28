var mysql = require('mysql');

// salvar
var save = function save(connection, response, params){
  var myObj = JSON.parse((JSON.stringify(params)));
  var string = 'INSERT INTO users VALUES(' + myObj.id + ',' + myObj.name + ',' + myObj.age + ')';
  // Insertar datos
  var insertText = connection.query(string, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    response.end(JSON.stringify(results));
  });
  connection.end();
}


// búsqueda de base de datos
var select = function(connection, response) {
  connection.connect(function (err) {
      if (err) {
          console.error('error connecting:' + err.stack)
      }
      console.log('connected as id ' + connection.threadId);
  })
  connection.query('SELECT * FROM `users` where id = 2', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is:', results);
      response.end(JSON.stringify(results));
  });
  connection.end();
}


// Salida de los datos en la tabla
function outputall(connection, response){
  // Salida de los datos en la tabla:
  var outputText = connection.query('SELECT * FROM `users`', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
  });
}


// Modifica los datos en la tabla
function modify(connection, response){
  connection.connect(function (err) {
      if (err) {
          console.error('error connecting:' + err.stack);
      }
      console.log('connected as id ' + connection.threadId);
  });
  connection.query('UPDATE demo SET name=?where id?', ['update', 1], function (error, results, fields) {
      if (error) throw error;
      console.log('changed:' + results.changeRows + 'rows');
  });
  connection.end();
}


// Eliminar
function deletes(connection, response) {
  connection.connect(function (err) {
      if (err) {
          console.error('error connecting:' + err.stack);
          return;
      }
      connection.query('DELETE FROM demo SET where id=?', [ 1], function (error, results, fields) {
          if (error) throw error;
          console.log('deleted:' + results.affectedRows + 'rows');
      });
      console.log('connected as id ' + connection.threadId);
      connection.end();
  });
}

module.exports = {
  save : save,
  select : select,
  outputall : outputall,
  modify : modify,
  deletes : deletes,
}
