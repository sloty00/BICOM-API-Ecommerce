/*
-------------------------------------TABLA COMPUESTA (E/R)--------------------------------------
*/

//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos.

const getProducts = async (bd_name, host, page) => {//Funcion de tipo asincronica.
    const mysql = createConnectMysql(host, bd_name)
    const products = await queryProducts(page, mysql)
    let jsonResult = {
        'total_rows': total_elementos,
        'total_page': total_paginas,
        'number_pagination': products.length,
        'page': page,
        'data': products
    }
    return jsonResult;
}

const queryProducts = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
    // limite de 100
    const limit = 100
    // calcula offset
    const offset = (page - 1) * limit
    // consulta de datos con numero de paginas y offset
    const prodsQuery = "SELECT products.id, products.`code`, products.barcode, products.barcode_type, products.description_details, products.description, products.measurement_unit_id, products.group_id, products.sub_group_id, products.price_net, products.cl_price_net_prod, products.cl_price_net_logistic, products.price_brute, products.is_inventory, products.is_visiblePOS, products.is_active, products.img_one, products.price_lastpur, products.stockmax, products.stockrep, products.stockmin, products.measurement_unit_convert_id, products.equivalence, products.custom1, products.custom2, products.custom3, products.custom4, products.custom5, products.cost_prom, products.deleted_at, products.created_at, products.updated_at, products.equivalence_two, products.weight, products.is_kit, products.has_kit, products.is_ticket, products.is_aggregate, products.is_ecommerce, products.print_details, products.is_recurrent, products.price_net_uf, products.is_free FROM products LIMIT " + limit + " OFFSET " + offset
    const prod = await query(prodsQuery, mysql);
    const totalQuery = "SELECT COUNT(*) AS id FROM products "
    const total = await query(totalQuery, mysql);

    total_elementos = total[0]['id']
    total_paginas = Math.ceil(total_elementos/100)
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