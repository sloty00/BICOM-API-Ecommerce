//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getMdMovement = async (bd_name, host, page, doc_type, is_sii, consolidate, invoice_date, begin_date, end_date) => {//Funcion de tipo asincronica.
    var filter_doc_type = ""
    var filter_is_sii = ""
    var filter_consolidate = ""
    var filter_invoice_date = ""
    var filter_begin_date = ""
    var filter_end_date = ""

    const limit = 100
    const offset = (page - 1) * limit
    const dbconnection = createConnectMysql(host, bd_name)
    console.log("comillas0: " + invoice_date);

  switch (doc_type !== "" && doc_type) {

    case '1':
        filter_doc_type=" AND mov.document_type_id= 1 ";
        console.log('Boletas Afecta');
    break;

    case '2':
        filter_doc_type=" AND mov.document_type_id= 2 ";
        console.log('Boletas Exenta');
    break;

    case '3':
        filter_doc_type=" AND mov.document_type_id= 3 ";
        console.log('Facturas Afecta');
    break;
    
    case '4':
        filter_doc_type=" AND mov.document_type_id= 4 ";
        console.log('Facturas Exenta');
    break;

    case '7':
        filter_doc_type=" AND mov.document_type_id= 7 ";
        console.log('Notas de Debito');
    break;

    case '8':
        filter_doc_type=" AND mov.document_type_id= 8 ";
        console.log('Notas de Credito');
    break;

    case '10':
        filter_doc_type=" AND mov.document_type_id= 10 ";
        console.log('Guias de Despacho');
    break;

    case '11':
        filter_doc_type=" AND mov.document_type_id= 11 ";
        console.log('Guias de Entrada');
    break;
  }


  switch (is_sii !=="" && is_sii) {

        case '1':
            filter_is_sii=" AND mov.is_sii = 1";
            console.log('Electronica');
        break;

        case '2':
            filter_is_sii=" AND mov.is_sii = 2";
            console.log('No Electronico');
        break;
  }

  switch (consolidate !=="" && consolidate) {

    case '0':
        filter_consolidate=" AND mov.consolidate = 0";
        console.log('Pendientes');
    break;

    case '1':
        filter_consolidate=" AND mov.consolidate = 1";
        console.log('Anulada');
    break;

    case '2':
        filter_consolidate=" AND mov.consolidate = 2";
        console.log('Generada');
    break;
  }

  switch (invoice_date !=="" && invoice_date) {
    case invoice_date:
        filter_invoice_date=" AND (mov.invoice_date = " + `'${invoice_date}')`;
        console.log('comillas2: '+ filter_invoice_date);
    break;
  }

  switch (begin_date !=="" && begin_date) {
    case begin_date:
        filter_begin_date=" AND (mov.invoice_date >= " + `'${begin_date}'`;
        console.log('Repository: '+begin_date);
    break;
  }

  switch (end_date !=="" && end_date) {
    case end_date:
        filter_end_date=" AND mov.invoice_date <= " + `'${end_date}')`;
        console.log('Repository: '+end_date);
    break;

  }
  
    const movements = await queryMdMovement(dbconnection, filter_doc_type, filter_is_sii, filter_consolidate, filter_invoice_date, filter_begin_date, filter_end_date, limit, offset)
    let jsonResult = {
        'total_rows': total_elementos,
        'total_pages':total_paginas,
        'page': page,
        'number_pagination': movements.length,
        'data': movements
    }
    console.log('comillas3: ' + filter_invoice_date);
    return jsonResult;
}

const queryMdMovement = async (dbconnection, filter_doc_type, filter_is_sii, filter_consolidate, filter_invoice_date, filter_begin_date, filter_end_date, limit, offset) => {//Funcion de tipo asincronica, realiza la consultas
    // consulta de datos con numero de paginas y offset
    const mdmovementQuery = "SELECT mov.id, mov.branchoffice_id, mov.code_sii, mov.folio, mov.concept_code, mov.concept_id, mov.invoice_date, mov.customer_supplier_id, mov.customer_supplier_name, mov.customer_supplier_activity, mov.document_type_id, mov.descriptions, mov.cost_center_id, mov.seller_id, mov.user_id, mov.payment_type_id, mov.subtotal, mov.value_discount, mov.type_discount, mov.total_discount, mov.total_discount_items, mov.tax, mov.total, mov.consolidate, mov.is_exempt, mov.warehouse_id, mov.warehouse_name, mov.warehouse_origin_id, mov.warehouse_destination_id, mov.cash_register_type_id, mov.cash_register_id, mov.posmachine_id, mov.state, mov.document_date, mov.number_document, mov.responsable, mov.reference_id, mov.reference_cancel_id, mov.state_send_sii, mov.state_response_sii, mov.payment_type_sii, mov.cod_referencia_sii, mov.type_dispatch_sii, mov.index_dispatch_sii, mov.autoguide, mov.is_sii, mov.activity_id, mov.activity_descriptions, mov.company_activity_id, mov.date_expiration, mov.exempt, mov.total_ila, mov.ticket_id, mov.value_tip, mov.invoice_time, mov.is_receptor, mov.is_contribuyente, mov.tax_value_bh, mov.is_ecommerce, mov.state_ecommerce, mov.phone_ecommerce, mov.address_ecommerce, mov.payment_method_ecommerce, mov.desired_date_ecommerce, mov.delivery_ecommerce, mov.is_appmobile, mov.surcharge_value, mov_det.id as detail_id, mov_det.product_id, mov_det.product_name, mov_det.measurement_unit_id, mov_det.price_net, mov_det.price_brute, mov_det.quantity_out, mov_det.quantity_in, mov_det.quantity_dispatch, mov_det.total_tax AS detail_tax, mov_det.consolidate, mov_det.total as detail_total, mov_det.product_descriptions, mov_det.kit_id, mov_det.kit_line, mov_det.tax_id, mov_det.value_ila, mov_det.promotion_id, mov_det.promotion_quantity, mov_det.promotion_oper, mov_det.promotion_discount_n, mov_det.promotion_discount_b FROM movements AS mov LEFT OUTER JOIN movement_details AS mov_det ON (mov.id = mov_det.movement_id)  WHERE 1=1 " + filter_doc_type + " " + filter_is_sii + " " + filter_consolidate + " " + filter_invoice_date + " " + filter_begin_date + " " + filter_end_date + " LIMIT " + limit + " OFFSET " + offset
    const mdTotalQuery = "SELECT COUNT(mov.id) AS id FROM movements AS mov LEFT OUTER JOIN movement_details AS mov_det ON (mov.id = mov_det.movement_id) WHERE 1=1 " + filter_doc_type + filter_is_sii + filter_consolidate + filter_invoice_date + filter_begin_date + filter_end_date
    const movement = await query(mdmovementQuery, dbconnection);
    const total = await query(mdTotalQuery, dbconnection);

    total_elementos = total[0]['id']
    total_paginas = Math.ceil(total_elementos/100)
    console.log(mdmovementQuery);
    console.log(mdTotalQuery);
    console.log("Repository :"+filter_invoice_date);

    return movement;
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
    getMdMovement
}