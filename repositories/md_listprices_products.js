//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getMdListprice = async (bd_name, host, page) => {//Funcion de tipo asincronica.
    const mysql = createConnectMysql(host, bd_name)
    const listprices = await queryMdListprices(page, mysql)
    let jsonResult = {
        'total_rows': total_elementos,
        'total_page': total_paginas,
        'number_pagination': listprices.length,
        'page': page,
        'data': listprices
    }
    return jsonResult;
}

const queryMdListprices = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
    // limite de 100
    const limit = 100
    // calcula offset
    const offset = (page - 1) * limit
    // consulta de datos con numero de paginas y offset
    const mdlistpricesQuery = "SELECT list_prices.id, list_prices.description, list_prices.formula, list_prices.date_ini, list_prices.date_end, list_prices.operation, list_prices.is_ecommerce, list_price_products.id AS list_price_products_id, list_price_products.list_price_id, list_price_products.product_id, list_price_products.price_brute, list_price_products.price_net FROM `list_prices` LEFT OUTER JOIN list_price_products ON list_prices.id = list_price_products.list_price_id WHERE list_prices.deleted_at is null LIMIT " + limit + " OFFSET " + offset
    const listprice = await query(mdlistpricesQuery, mysql);
    const totalQuery = "SELECT COUNT(*) AS id FROM `list_prices` LEFT OUTER JOIN list_price_products ON list_prices.id = list_price_products.list_price_id WHERE list_prices.deleted_at is null "
    const total = await query(totalQuery, mysql);

    total_elementos = total[0]['id']
    total_paginas= Math.ceil(total_elementos/100)
    return listprice;
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
    getMdListprice
}