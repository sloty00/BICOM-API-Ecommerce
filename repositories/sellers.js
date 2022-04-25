/*
-------------------------------------TABLA COMPUESTA (E/R POR USER)--------------------------------------
*/

//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getSellers = async (bd_name, host, page) => {//Funcion de tipo asincronica.

    // limite de 100
    const limit = 100
    // calcula offset
    const offset = (page - 1) * limit
    const mysql = createConnectMysql(host, bd_name)
    const sellers = await querySellers(page, mysql, limit, offset)
    let jsonResult = {
        'total_rows': total_elementos,
        'total_page': total_paginas,
        'number_pagination': sellers.length,
        'page': page,
        'data': sellers
    }
    return jsonResult;
}

const querySellers = async (page, mysql, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
    // consulta de datos con numero de paginas y offset
    const sellersQuery = "SELECT sellers.id, sellers.description, sellers.user_id FROM sellers WHERE deleted_at IS NULL LIMIT " + limit + " OFFSET " + offset
    const seller = await query(sellersQuery, mysql);
    const totalQuery = "SELECT COUNT(*) AS id FROM sellers WHERE deleted_at IS NULL"
    const total = await query(totalQuery, mysql);

    total_elementos = total[0]['id']
    total_paginas = Math.ceil(total_elementos/100)
    return seller;
}

const getAddSellers = async (bd_name, host, id, description, user_id) => {
    var id, description, user_id;
    var f = new Date();
    var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
    const mysql = createConnectMysql(host, bd_name)
    const sellersAddQuery = "INSERT INTO sellers (id, description, user_id, created_at, updated_at) VALUES" + " (" + id + ", '" + description + "', " + user_id + ", '" + datenow + "', '" + datenow + "')"
    const addsellers = await query(sellersAddQuery, mysql);
    return addsellers;
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
    getSellers,
    getAddSellers
}