//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getMdQuoteDetail = async (bd_name, host, page, invoice_date, begin_date, end_date) => {//Funcion de tipo asincronica.
    var filter_quote_date= ""
    var filter_begin_date = ""
    var filter_end_date = ""

    // limite de 100
    const limit = 100
    // calcula offset
    const offset = (page - 1) * limit
    const mysql = createConnectMysql(host, bd_name)

    switch (invoice_date !=="" && invoice_date) {

        case invoice_date:
            filter_quote_date=" AND quotes.quote_date = " + `'${invoice_date}'`;
            console.log('Quotes');
        break;
    }
    switch (begin_date!=="" && begin_date) {

        case begin_date:
            filter_begin_date=" AND (quotes.quote_date >= " + `'${begin_date}'`;
            console.log('Quotes');
        break;
    }
    switch (end_date !=="" && end_date) {

        case end_date:
            filter_end_date=" AND quotes.quote_date <= " + `'${end_date}')`;
            console.log('Quotes');
        break;
    }
    var filter_between = filter_begin_date + filter_end_date;
    console.log(filter_between);
    const quotesdet = await queryMdQuoteDetail(page, mysql, limit, offset, filter_quote_date, filter_between)

    let jsonResult = {
        'total_rows': total_elementos,
        'total_page': total_paginas,
        'number_pagination': quotesdet.length,
        'page': page,
        'data': quotesdet
    }
    return jsonResult;
}

const queryMdQuoteDetail = async (page, mysql, limit, offset, filter_quote_date, filter_between) => {//Funcion de tipo asincronica, realiza la consulta.
    // consulta de datos con numero de paginas y offset
    const quotesdetQuery = "SELECT quotes.id, quotes.branchoffice_id, quotes.quote_date, quotes.customer_supplier_id, quotes.customer_supplier_name, quotes.customer_supplier_activity, quotes.document_type_id, quotes.descriptions, quotes.cost_center_id, quotes.seller_id, quotes.user_id, quotes.payment_type_id, quotes.subtotal, quotes.value_discount, quotes.type_discount, quotes.total_discount, quotes.total_discount_items, quotes.tax, quotes.total, quotes.consolidate, quotes.is_exempt, quotes.warehouse_id, quotes.warehouse_name, quotes.warehouse_origin_id, quotes.warehouse_destination_id, quotes.state, quotes.document_date, quotes.number_document, quotes.responsable, quotes.reference_id, quotes.reference_cancel_id, quotes.state_send_sii, quotes.state_response_sii, quotes.payment_type_sii, quotes.is_sii, quotes.activity_id, quotes.activity_descriptions, quotes.company_activity_id, quotes.date_expiration, quotes.exempt, quotes.folio, quotes.total_ila, quotes.is_around, quotes.is_shipping, quotes.shipping_service_id, quotes.tariff_id, quotes.shipping_destination_id, quote_details.id AS quotes_details_id, quote_details.quote_id, quote_details.product_id, quote_details.product_name, quote_details.product_weight, quote_details.measurement_unit_id, quote_details.price_net, quote_details.price_brute, quote_details.price_cost, quote_details.price_net_new, quote_details.quantity_out_base, quote_details.quantity_in_base, quote_details.quantity_dispatch_base, quote_details.total_tax, quote_details.product_descriptions, quote_details.tax_id, quote_details.value_ila FROM quotes LEFT OUTER JOIN quote_details ON quotes.id = quote_details.quote_id WHERE 1+1 " + filter_quote_date + " " + filter_between + " LIMIT " + limit + " OFFSET " + offset
    const quotedet = await query(quotesdetQuery, mysql);
    const totalQuery = "SELECT COUNT(*) AS id FROM quotes LEFT OUTER JOIN quote_details ON quotes.id = quote_details.quote_id WHERE 1=1 " +filter_quote_date + filter_between
    const total = await query(totalQuery, mysql);

    console.log(quotesdetQuery);
    total_elementos = total[0]['id']
    total_paginas= Math.ceil(total_elementos/100)
    return quotedet;
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
    getMdQuoteDetail
}