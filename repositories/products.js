const { createConnectMysql } = require("../config/dbConnect")

const getProducts = async (bd_name, host, page) => {
    const mysql = createConnectMysql(host, bd_name)
    const products = await queryProducts(page, mysql)
    let jsonResult = {
        'numero elementos': products.length,
        'numero paginas': page,
        'productos': products
    }
    return jsonResult;
}

const queryProducts = async (page, mysql) => {
    // limite de 100
    const limit = 100
    // numeros paginas

    // calcula offset
    const offset = (page - 1) * limit
    // consulta de datos con numero de paginas y offset
    const prodsQuery = "select * from products limit " + limit + " OFFSET " + offset
    const prod = await query(prodsQuery, mysql);
    return prod;
}

//Deberia ir en herlpers
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

module.exports = {
    getProducts
}