//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getMdInventories = async (bd_name, host, page, invoice_date, begin_date, end_date) => {//Funcion de tipo asincronica.
    var filter_invoice_date =""
    var filter_invoice_date =""
    var filter_begin_date =""
    var filter_end_date = ""

    const mysql = createConnectMysql(host, bd_name)
    switch (invoice_date !=="" && invoice_date) {

        case invoice_date:
            filter_invoice_date="WHERE inv.invoice_date = " + `'${invoice_date}'`;
            console.log('Quotes');
        break;
    }
    switch (filter_invoice_date !== "" && begin_date !=="" && begin_date) {

        case begin_date:
            filter_begin_date="WHERE inv.invoice_date >= " + `'${begin_date}'`;
            console.log('Quotes');
        break;
    }
    switch (filter_invoice_date !== "" && end_date !=="" && end_date) {

        case end_date:
            filter_end_date=" AND inv.invoice_date <= " + `'${end_date}'`;
            console.log('Quotes');
        break;
    }
    switch (filter_invoice_date == "" && begin_date!=="" && begin_date) {

        case begin_date:
            filter_begin_date="WHERE inv.invoice_date >= " + `'${begin_date}'`;
            console.log('Quotes');
        break;
    }
    switch (filter_invoice_date == "" && end_date !=="" && end_date) {

        case end_date:
            filter_end_date=" AND inv.invoice_date <= " + `'${end_date}'`;
            console.log('Quotes');
        break;
    }
    var filter_between = filter_begin_date + filter_end_date;
    const inventories = await queryMdInventories(page, mysql, filter_invoice_date, filter_between)
    let jsonResult = {
        'total_rows': total_elementos,
        'total_page': total_paginas,
        'number_pagination': inventories.length,
        'page': page,
        'data': inventories
    }
    return jsonResult;
}

const queryMdInventories = async (page, mysql, filter_invoice_date, filter_between) => {//Funcion de tipo asincronica, realiza la consulta.
    // limite de 100
    const limit = 100
    // calcula offset
    const offset = (page - 1) * limit
    // consulta de datos con numero de paginas y offset
    const mdinventoriesQuery = "SELECT inv.id, inv.branchoffice_id, inv.invoice_date, inv.descriptions, inv.cost_center_id, inv.consolidate, inv.warehouse_id, inv.warehouse_name, inv.movement_entry_id, inv.movement_output_id, inv.state, inv.responsable, inv.is_zero, inv_det.id as detail_id, inv_det.inventory_id, inv_det.product_id, inv_det.product_name, inv_det.measurement_unit_id, inv_det.quantity, inv_det.quantity_old, inv_det.quantity_base, inv_det.quantity_old_base FROM inventories AS inv LEFT OUTER JOIN inventory_details AS inv_det ON (inv.id = inv_det.inventory_id) " + filter_invoice_date + filter_between + "LIMIT " + limit + " OFFSET " + offset
    const inventories = await query(mdinventoriesQuery, mysql);
    const totalQuery = "SELECT COUNT(*) AS id FROM inventories AS inv LEFT OUTER JOIN inventory_details AS inv_det ON (inv.id = inv_det.inventory_id) " + filter_invoice_date + filter_between
    const total = await query(totalQuery, mysql);

    console.log(mdinventoriesQuery);
    total_elementos = total[0]['id']
    total_paginas= Math.ceil(total_elementos/100)
    return inventories;
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
    getMdInventories
}