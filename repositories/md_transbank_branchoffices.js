//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getMdTransbankBranch = async (bd_name, host, page) => {//Funcion de tipo asincronica.
    const mysql = createConnectMysql(host, bd_name)
    const transbranch = await queryMdTransbankBranch(page, mysql)
    let jsonResult = {
        'total_rows': total_elementos,
        'total_page': total_paginas,
        'number_pagination': transbranch.length,
        'page': page,
        'data': transbranch
    }
    return jsonResult;
}

const queryMdTransbankBranch = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
    // limite de 100
    const limit = 100
    // calcula offset
    const offset = (page - 1) * limit
    // consulta de datos con numero de paginas y offset
    const mdtransbranchsQuery = "SELECT prod.id, prod.`code`, prod.barcode, prod.barcode_type, prod.description, prod.description_details, prod.measurement_unit_id, prod.group_id, prod.sub_group_id, prod.price_net, prod.cl_price_net_prod, prod.cl_price_net_logistic, prod.price_brute, prod.is_inventory, prod.is_visiblePOS, prod.is_active, prod.img_one, prod.price_lastpur, prod.stockmax, prod.stockrep, prod.stockmin, prod.measurement_unit_convert_id, prod.equivalence, prod.custom1, prod.custom2, prod.custom3, prod.custom4, prod.custom5, prod.cost_prom, prod.equivalence_two, prod.weight, prod.is_kit, prod.has_kit, prod.is_ticket, prod.is_aggregate, prod.is_ecommerce, prod.print_details, prod.is_recurrent, prod.price_net_uf, prod.is_free, ecoprodi.id, ecoprodi.product_id, ecoprodi.img_one, ecoprodi.img_two, ecoprodi.img_three, ecoprodi.img_four, ecoprodi.img_five, ecoprodi.product_details, ecoprodi.product_details_short FROM products AS prod LEFT OUTER JOIN ecommerce_product_images AS ecoprodi ON prod.id = ecoprodi.product_id WHERE prod.is_ecommerce = 1 LIMIT " + limit + " OFFSET " + offset
    const transbanchs = await query(mdtransbranchsQuery, mysql);
    const totalQuery = "SELECT COUNT(*) AS id FROM products AS prod LEFT OUTER JOIN ecommerce_product_images AS ecoprodi ON prod.id = ecoprodi.product_id WHERE prod.is_ecommerce = 1 "
    const total = await query(totalQuery, mysql);

    total_elementos = total[0]['id']
    total_paginas= Math.ceil(total_elementos/100)
    return transbanchs;
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
    getMdTransbankBranch
}