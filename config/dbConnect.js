const mysql = require('mysql');

createConnectMysql = (host,bd_name) => {
    // Agregue las credenciales para acceder a su base de datos
    let connection;
    switch (host) {
        case '1':
            connection = mysql.createConnection({
                host     : process.env.BC_HOST_MYSQL_1,
                user     : process.env.BC_USER_MYSQL_1,
                password : process.env.BC_PASSWORD_MYSQL_1,
                port     : process.env.BC_PORT_MYSQL_1,
                database : bd_name
            });
        break;
        case '2':
            connection = mysql.createConnection({
                host     : process.env.BC_HOST_MYSQL_2,
                user     : process.env.BC_USER_MYSQL_2,
                password : process.env.BC_PASSWORD_MYSQL_2,
                port     : process.env.BC_PORT_MYSQL_2,
                database : bd_name
            });
        break;
        case '3':
            connection = mysql.createConnection({
                host     : process.env.BC_HOST_MYSQL_3,
                user     : process.env.BC_USER_MYSQL_3,
                password : process.env.BC_PASSWORD_MYSQL_3,
                port     : process.env.BC_PORT_MYSQL_3,
                database : bd_name
            });
        break;
        case '4':
            connection = mysql.createConnection({
                host     : process.env.BC_HOST_MYSQL_4,
                user     : process.env.BC_USER_MYSQL_4,
                password : process.env.BC_PASSWORD_MYSQL_4,
                port     : process.env.BC_PORT_MYSQL_4,
                database : bd_name
            });
        break;
    }
    
    // conectarse a mysql
    connection.connect(function(err) {
        // en caso de error
        if(err){
            console.log(err.code);
            console.log(err.fatal);
        }
    });

    return connection;
}

module.exports = {
    createConnectMysql
}