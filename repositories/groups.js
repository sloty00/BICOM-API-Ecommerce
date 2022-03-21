/*
-------------------------------------TABLA BASE--------------------------------------
*/

//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getGroups = async (bd_name, host, page) => {//Funcion de tipo asincronica.
    const mysql = createConnectMysql(host, bd_name)
    const groups = await queryGroups(page, mysql)
    let jsonResult = {
        'numero elementos': groups.length,
        'numero paginas': page,
        'Groups': groups
    }
    return jsonResult;
}

const queryGroups = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
    // limite de 100
    const limit = 100
    // calcula offset
    const offset = (page - 1) * limit
    // consulta de datos con numero de paginas y offset
    const groupQuery = "select * from `groups` limit " + limit + " OFFSET " + offset
    const group = await query(groupQuery, mysql);
    return group;
}

//Deberia ir en herlpers
//Controla los errores de conexion
const query = (sql, mysql) => {
    return new Promise((resolve, reject) => {
        mysql.query(sql, (err, rows) => {
            if (err) {
                return reject(err);
            }
            return resolve(rows)
        })
    })
}

//Exportamos la funcion para usar los datos en controller/products.js.
module.exports = {
    getGroups
}