//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getMdMovement = async (bd_name, host, page, doc_type) => {//Funcion de tipo asincronica.
    console.log("repository: "+doc_type);
    const dbconnection = createConnectMysql(host, bd_name)
    const movements = await queryMdMovement(page, dbconnection, doc_type)
      
  switch (doc_type) {
    case '1':
        doc_type = 1
        console.log('Boletas Afecta');
    break;

    case '2':
        doc_type = 2
        console.log('Boletas Exenta');
    break;

    case '3':
        doc_type = 3
        console.log('Facturas Afecta');
    break;
    
    case '4':
        doc_type = 4
        console.log('Facturas Exenta');
    break;

    case '7':
        doc_type = 7
        console.log('Notas de Debito');
    break;

    case '8':
        doc_type = 8
        console.log('Notas de Credito');
    break;

    case '10':
        doc_type = 10
        console.log('Guias de Despacho');
    break;

    case '11':
        doc_type = 11
        console.log('Guias de Entrada');
    break;
  }
    
    let jsonResult = {
        'numero elementos': movements.length,
        'numero paginas': page,
        'M-D Movements': movements
    }
    console.log("repository: "+doc_type);
    return jsonResult;
    
}

const queryMdMovement = async (page, dbconnection, doc_type) => {//Funcion de tipo asincronica, realiza la consulta.s
    var doc_type
    // limite de 100
    const limit = 10
    // calcula offset
    const offset = (page - 1) * limit
    // consulta de datos con numero de paginas y offset
    const mdmovementQuery = "SELECT mov.id, mov.branchoffice_id, mov.code_sii, mov.folio, mov.concept_code, mov.concept_id, mov.invoice_date, mov.customer_supplier_id, mov.customer_supplier_name, mov.customer_supplier_activity, mov.document_type_id, mov.descriptions, mov.cost_center_id, mov.seller_id, mov.user_id, mov.payment_type_id, mov.subtotal, mov.value_discount, mov.type_discount, mov.total_discount, mov.total_discount_items, mov.tax, mov.total, mov.consolidate, mov.is_exempt, mov.warehouse_id, mov.warehouse_name, mov.warehouse_origin_id, mov.warehouse_destination_id, mov.cash_register_type_id, mov.cash_register_id, mov.posmachine_id, mov.state, mov.document_date, mov.number_document, mov.responsable, mov.reference_id, mov.reference_cancel_id, mov.state_send_sii, mov.state_response_sii, mov.payment_type_sii, mov.cod_referencia_sii, mov.type_dispatch_sii, mov.index_dispatch_sii, mov.autoguide, mov.is_sii, mov.activity_id, mov.activity_descriptions, mov.company_activity_id, mov.date_expiration, mov.exempt, mov.total_ila, mov.ticket_id, mov.value_tip, mov.invoice_time, mov.is_receptor, mov.is_contribuyente, mov.tax_value_bh, mov.is_ecommerce, mov.state_ecommerce, mov.phone_ecommerce, mov.address_ecommerce, mov.payment_method_ecommerce, mov.desired_date_ecommerce, mov.delivery_ecommerce, mov.is_appmobile, mov.mongodb_id, mov.surcharge_value, mov.json_dte, mov_det.id as detail_id, mov_det.movement_id, mov_det.product_id, mov_det.product_name, mov_det.measurement_unit_id, mov_det.price_net, mov_det.price_brute, mov_det.price_cost, mov_det.price_net_new, mov_det.quantity_out, mov_det.quantity_in, mov_det.quantity_dispatch, mov_det.total_tax, mov_det.consolidate, mov_det.total as detail_total, mov_det.product_descriptions, mov_det.kit_id, mov_det.kit_line, mov_det.tax_id, mov_det.value_ila, mov_det.promotion_id, mov_det.promotion_quantity, mov_det.promotion_oper, mov_det.promotion_discount_n, mov_det.promotion_discount_b, mov_det.net_logistic, mov_det.net_logistic_total FROM movements AS mov LEFT OUTER JOIN movement_details AS mov_det ON (mov.id = mov_det.movement_id) WHERE mov.document_type_id = " + doc_type + " LIMIT " + limit + " OFFSET " + offset
    const movement = await query(mdmovementQuery, dbconnection);
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