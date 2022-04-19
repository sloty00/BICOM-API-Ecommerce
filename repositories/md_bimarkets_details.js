//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getMdBimarketDetail = async (bd_name, host, page, invoice_date, begin_date, end_date) => {//Funcion de tipo asincronica.
    var filter_invoice_date = ""
    var filter_begin_date = ""
    var filter_end_date =""

    // limite de 100
    const limit = 100
    // calcula offset
    const offset = (page - 1) * limit
    const mysql = createConnectMysql(host, bd_name)

    switch (invoice_date !=="" && invoice_date) {

        case invoice_date:
            filter_invoice_date=" AND t_bimarkets.invoice_date = " + `'${invoice_date}'`;
        break;
    }
    switch (begin_date !=="" && begin_date) {

        case begin_date:
            filter_begin_date=" AND (t_bimarkets.invoice_date >= " + `'${begin_date}'`;
        break;
    }
    switch (end_date !=="" && end_date) {

        case end_date:
            filter_end_date=" AND t_bimarkets.invoice_date <= " + `'${end_date}')`;
        break;
    }
    var filter_between = filter_begin_date + filter_end_date;

    const bimarketsdet = await queryMdBimarketDetail(page, mysql, limit, offset, filter_invoice_date, filter_between)
    let jsonResult = {
        'total_rows': total_elementos,
        'total_page': total_paginas,
        'number_pagination': bimarketsdet.length,
        'page': page,
        'data': bimarketsdet
    }
    return jsonResult;
}

const queryMdBimarketDetail = async (page, mysql, limit, offset, filter_invoice_date, filter_between) => {//Funcion de tipo asincronica, realiza la consulta.
    // consulta de datos con numero de paginas y offset
    const bimarketsdetQuery = " SELECT t_bimarkets.id, t_bimarkets.branchoffice_id, t_bimarkets.code_sii, t_bimarkets.folio, t_bimarkets.invoice_date, t_bimarkets.customer_supplier_id, t_bimarkets.customer_supplier_name, t_bimarkets.customer_supplier_activity, t_bimarkets.descriptions, t_bimarkets.seller_id, t_bimarkets.user_id, t_bimarkets.payment_type_id, t_bimarkets.subtotal, t_bimarkets.value_discount, t_bimarkets.type_discount, t_bimarkets.total_discount, t_bimarkets.total_discount_items, t_bimarkets.tax, t_bimarkets.total, t_bimarkets.consolidate, t_bimarkets.is_exempt, t_bimarkets.warehouse_id, t_bimarkets.warehouse_name, t_bimarkets.cash_register_type_id, t_bimarkets.cash_register_id, t_bimarkets.posmachine_id, t_bimarkets.state, t_bimarkets.exempt, t_bimarkets.total_ila, t_bimarkets.movement_id, t_bimarkets.value_tip, t_bimarkets.invoice_time, t_bimarkets.is_appmobile, t_bimarkets.reserve_cash_register, t_bimarketsd.id AS ticket_bimarket_details_id, t_bimarketsd.product_id, t_bimarketsd.product_name, t_bimarketsd.measurement_unit_id, t_bimarketsd.price_net, t_bimarketsd.price_brute, t_bimarketsd.quantity_out, t_bimarketsd.quantity_in, t_bimarketsd.quantity_dispatch, t_bimarketsd.total_tax, t_bimarketsd.product_descriptions, t_bimarketsd.kit_id, t_bimarketsd.kit_line, t_bimarketsd.tax_id, t_bimarketsd.value_ila, t_bimarketsd.promotion_id, t_bimarketsd.promotion_quantity, t_bimarketsd.promotion_oper, t_bimarketsd.promotion_discount_n, t_bimarketsd.promotion_discount_b FROM ticket_bimarkets AS t_bimarkets LEFT OUTER JOIN ticket_bimarket_details AS t_bimarketsd ON t_bimarkets.id = t_bimarketsd.ticket_bimarket_id WHERE 1+1 " + filter_invoice_date + " " + filter_between +" LIMIT " + limit + " OFFSET " + offset
    const bimarketdet = await query(bimarketsdetQuery, mysql);
    const totalQuery = "SELECT COUNT(*) AS id FROM ticket_bimarkets AS t_bimarkets LEFT OUTER JOIN ticket_bimarket_details AS t_bimarketsd ON t_bimarkets.id = t_bimarketsd.ticket_bimarket_id WHERE 1+1" + filter_invoice_date + filter_between
    const total = await query(totalQuery, mysql);
    total_elementos = total[0]['id']
    total_paginas= Math.ceil(total_elementos/100)
    return bimarketdet;
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
    getMdBimarketDetail
}