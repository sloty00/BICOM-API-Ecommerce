//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getMdMovement = async (bd_name, host, page) => {//Funcion de tipo asincronica.
    const mysql = createConnectMysql(host, bd_name)
    const movements = await queryMdMovement(page, mysql)
    let jsonResult = {
        'numero elementos': movements.length,
        'numero paginas': page,
        'M-D Inventory': movements
    }
    return jsonResult;
}

const queryMdMovement = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
    // limite de 100
    const limit = 100
    // calcula offset
    const offset = (page - 1) * limit
    // consulta de datos con numero de paginas y offset
    const mdmovementQuery = "SELECT mov.`id`, mov.`branchoffice_id`, mov.`code_sii`, mov.`folio`, mov.`concept_code`, mov.`concept_id`, mov.`invoice_date`, mov.`customer_supplier_id`, mov.`customer_supplier_name`, mov.`customer_supplier_activity`, mov.`document_type_id`, mov.`descriptions`, mov.`cost_center_id`, mov.`seller_id`, mov.`user_id`, mov.`payment_type_id`, mov.`subtotal`, mov.`value_discount`, mov.`type_discount`, mov.`total_discount`, mov.`total_discount_items`, mov.`tax`, mov.`total`, mov.`consolidate`, mov.`is_exempt`, mov.`warehouse_id`, mov.`warehouse_name`, mov.`warehouse_origin_id`, mov.`warehouse_destination_id`, mov.`cash_register_type_id`, mov.`cash_register_id`, mov.`posmachine_id`, mov.`state`, mov.`document_date`, mov.`number_document`, mov.`responsable`, mov.`reference_id`, mov.`reference_cancel_id`, mov.`state_send_sii`, mov.`state_response_sii`, mov.`payment_type_sii`, mov.`cod_referencia_sii`, mov.`type_dispatch_sii`, mov.`index_dispatch_sii`, mov.`autoguide`, mov.`is_sii`, mov.`activity_id`, mov.`activity_descriptions`, mov.`company_activity_id`, mov.`date_expiration`, mov.`exempt`, mov.`total_ila`, mov.`ticket_id`, mov.`value_tip`, mov.`invoice_time`, mov.`is_receptor`, mov.`is_contribuyente`, mov.`tax_value_bh`, mov.`is_ecommerce`, mov.`state_ecommerce`, mov.`phone_ecommerce`, mov.`address_ecommerce`, mov.`payment_method_ecommerce`, mov.`desired_date_ecommerce`, mov.`delivery_ecommerce`, mov.`is_appmobile`, mov.`mongodb_id`, mov.`surcharge_value`, mov.`json_dte`, mov_det.`id` as detail_id, mov_det.`movement_id`, mov_det.`product_id`, mov_det.`product_name`, mov_det.`measurement_unit_id`, mov_det.`price_net`, mov_det.`price_brute`, mov_det.`price_cost`, mov_det.`price_net_new`, mov_det.`quantity_out`, mov_det.`quantity_in`, mov_det.`quantity_dispatch`, mov_det.`total_tax`, mov_det.`consolidate`, mov_det.`total` as detail_total, mov_det.`product_descriptions`, mov_det.`kit_id`, mov_det.`kit_line`, mov_det.`tax_id`, mov_det.`value_ila`, mov_det.`promotion_id`, mov_det.`promotion_quantity`, mov_det.`promotion_oper`, mov_det.`promotion_discount_n`, mov_det.`promotion_discount_b`, mov_det.`net_logistic`, mov_det.`net_logistic_total` FROM movements AS mov LEFT OUTER JOIN movement_details AS mov_det ON (mov.id = mov_det.movement_id) WHERE mov.document_type_id = 10 LIMIT " + limit + " OFFSET " + offset
    const movement = await query(mdmovementQuery, mysql);
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