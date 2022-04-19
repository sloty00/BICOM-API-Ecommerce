//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getMdProduct = async (bd_name, host, page) => {//Funcion de tipo asincronica.

    const limit = 100
    const offset = (page - 1) * limit
    const mysql = createConnectMysql(host, bd_name)


    const products = await queryMdProducts(page, mysql, limit, offset)
    let jsonResult = {
        'total_rows': total_elementos,
        'total_page': total_paginas,
        'number_pagination': products.length,
        'page': page,
        'data': products
    }
    return jsonResult;
}

const queryMdProducts = async (page, mysql, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
    // consulta de datos con numero de paginas y offset
    const mdproductsQuery = "SELECT prod.id, prod.`code`, prod.barcode, prod.barcode_type, prod.description, prod.description_details, prod.measurement_unit_id, prod.group_id, prod.sub_group_id, prod.price_net, prod.cl_price_net_prod, prod.cl_price_net_logistic, prod.price_brute, prod.is_inventory, prod.is_visiblePOS, prod.is_active, prod.img_one, prod.price_lastpur, prod.stockmax, prod.stockrep, prod.stockmin, prod.custom1, prod.custom2, prod.custom3, prod.custom4, prod.custom5, prod.cost_prom, prod.weight, prod.is_kit, prod.has_kit, prod.is_ticket, prod.is_aggregate, prod.is_ecommerce, prod.print_details, prod.is_recurrent, prod.price_net_uf, prod.is_free, ecoprodi.id, ecoprodi.product_id, ecoprodi.img_one, ecoprodi.img_two, ecoprodi.img_three, ecoprodi.img_four, ecoprodi.img_five, ecoprodi.product_details, ecoprodi.product_details_short FROM products AS prod LEFT OUTER JOIN ecommerce_product_images AS ecoprodi ON prod.id = ecoprodi.product_id WHERE prod.deleted_at is null " + " LIMIT " + limit + " OFFSET " + offset
    const product = await query(mdproductsQuery, mysql);
    const totalQuery = "SELECT COUNT(*) AS id FROM products AS prod LEFT OUTER JOIN ecommerce_product_images AS ecoprodi ON prod.id = ecoprodi.product_id WHERE prod.deleted_at is null "
    const total = await query(totalQuery, mysql);

    total_elementos = total[0]['id']
    total_paginas= Math.ceil(total_elementos/100)
    return product;
}

//Deberia ir en helpers
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
    getMdProduct
}