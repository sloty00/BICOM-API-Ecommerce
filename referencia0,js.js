var fs = require('fs');
var mysql = require('./mysql');

function home(response){
    response.writeHead(200,{'Content-Type':'text/html'});
    var myReaderStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
    myReaderStream.pipe(response);
}

function review(response){
    response.writeHead(200,{'Content-Type':'text/html'});
    var myReaderStream = fs.createReadStream(__dirname + '/review.html', 'utf8');
    myReaderStream.pipe(response);
}

function api_records(response, params){
    response.writeHead(200,{'Content-Type':'application/json'});
    // params: es el contenido que se va a pasar
    response.end(JSON.stringify(params));
}

// Operación de lectura de la base de datos
function api_mysql_getifo(response, params){
    response.writeHead(200,{'Content-Type':'application/json'});
    //------------------------------------------------------------
    var mysql = require('mysql');

    // Crea una conexión a un servidor en la nube
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'aliyun'
    });

    // // Crea una conexión local
    // var connection = mysql.createConnection({
    // host     : 'localhost',
    // user     : 'root',
    // password : 'qaz123456',
    // database : 'aliyuntext'
    // });

    mysql = require('./mysql');
    // save(connection);
    mysql.select(connection,response);
    
    // response.end("succeed!");
}

// Operación de entrada de la base de datos
function api_mysql_postifo(response, params){
    response.writeHead(200,{'Content-Type':'application/json'});
    //**************************************************************
    var mysql = require('mysql');

    // Crea una conexión a un servidor en la nube
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'aliyun'
    });
    
    // // Crea una conexión local
    // var connection = mysql.createConnection({
    //     host     : 'localhost',
    //     user     : 'root',
    //     password : 'qaz123456',
    //     database : 'aliyuntext'
    //     });

    mysql = require('./mysql');
    mysql.save(connection, response, params);
    // mysql.
}


module.exports = {
    home : home,
    review : review,
    api_records : api_records,
    api_mysql_getifo : api_mysql_getifo,
    api_mysql_postifo : api_mysql_postifo
}