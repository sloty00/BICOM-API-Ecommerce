/*
-------------------------------------TABLA COMPUESTA (E/R)--------------------------------------
*/

//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos.

const getProducts = async (bd_name, host, page) => {//Funcion de tipo asincronica.
    const mysql = createConnectMysql(host, bd_name)
    const products = await queryProducts(page, mysql)
    let jsonResult = {
        'numero elementos': products.length,
        'numero paginas': page,
        'Products': products
    }
    return jsonResult;
}

const queryProducts = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
    // limite de 100
    const limit = 100
    // calcula offset
    const offset = (page - 1) * limit
    // consulta de datos con numero de paginas y offset
    const prodsQuery = "select * from products limit " + limit + " OFFSET " + offset
    const prod = await query(prodsQuery, mysql);
    return prod;
}

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
    getProducts
}