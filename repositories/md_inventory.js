//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getMdInventory = async (bd_name, host, page) => {//Funcion de tipo asincronica.
    const mysql = createConnectMysql(host, bd_name)
    const inventorys = await queryMdInventory(page, mysql)
    let jsonResult = {
        'numero elementos': inventorys.length,
        'numero paginas': page,
        'M-D Inventory': inventorys
    }
    return jsonResult;
}

const queryMdInventory = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
    // limite de 100
    const limit = 100
    // calcula offset
    const offset = (page - 1) * limit
    // consulta de datos con numero de paginas y offset
    const mdinventoryQuery = "SELECT inv.id, inv.branchoffice_id, inv.invoice_date, inv.descriptions, inv.cost_center_id, inv.consolidate, inv.warehouse_id, inv.warehouse_name, inv.movement_entry_id, inv.movement_output_id, inv.state, inv.responsable, inv.is_zero, inv_det.id as detail_id, inv_det.inventory_id, inv_det.product_id, inv_det.product_name, inv_det.measurement_unit_id, inv_det.quantity, inv_det.quantity_old, inv_det.quantity_base, inv_det.quantity_old_base FROM inventories AS inv LEFT OUTER JOIN inventory_details AS inv_det ON (inv.id = inv_det.inventory_id) LIMIT " + limit + " OFFSET " + offset
    const inventory = await query(mdinventoryQuery, mysql);
    return inventory;
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
    getMdInventory
}