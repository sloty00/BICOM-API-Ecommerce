/*
-------------------------------------TABLA COMPUESTA (E/R)--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getCRT = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  const mysql = createConnectMysql(host, bd_name)
  const crts = await queryGetAllCRT(page, mysql, limit, offset)
  let jsonResult = {
    'total_rows': total_elementos,
    'total_page':total_paginas,
    'number_pagination': crts.length,
    'page': page,
    'data': crts
  }
  return jsonResult;
}

const queryGetAllCRT = async (page, mysql, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
  // consulta de datos con numero de paginas y offset
  const crtQuery = "SELECT cash_register_types.id, cash_register_types.branchoffice_id, cash_register_types.description, cash_register_types.posmachine_id, cash_register_types.warehouse_id, cash_register_types.cost_center_id, cash_register_types.printer_id, cash_register_types.transbank_machine_id, cash_register_types.state FROM cash_register_types LIMIT " + limit + " OFFSET " + offset
  const crt= await query(crtQuery, mysql);
  const totalQuery = "SELECT COUNT(*) AS id FROM cash_register_types "
  const total= await query(totalQuery, mysql);

  total_elementos = total[0]['id']
  total_paginas = Math.ceil(total_elementos/100)
  return crt;
}

/* const AddCRT = async (bd_name, host, id, branchoffice_id, description, posmachine_id, warehouse_id, cost_center_id, printer_id, transbank_machine_id, state) => {
  
  var id, branchoffice_id, description, posmachine_id, warehouse_id, cost_center_id, printer_id, transbank_machine_id, state;
  var f = new Date();
  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const banksAddQuery = "INSERT INTO cash_register_types (id, branchoffice_id, description, posmachine_id, warehouse_id, cost_center_id, printer_id, transbank_machine_id, state, created_at, updated_at) VALUES" + " (" + id + ", " + branchoffice_id + ", '" + description + "', " + posmachine_id + ", " + warehouse_id + ", " + cost_center_id + ", " + printer_id + ", " + transbank_machine_id +", " + state + ", '" + datenow +"', '" + datenow +"')"
  const add = await query(banksAddQuery, mysql);
  return add;
} */

const PutCRT = async (bd_name, host, id_params, id, branchoffice_id, description, posmachine_id, warehouse_id, cost_center_id, printer_id, transbank_machine_id, state) => {
  var id, branchoffice_id, description, posmachine_id, warehouse_id, cost_center_id, printer_id, transbank_machine_id, state;
  var f_id, f_branchoffice_id, f_description, f_posmachine_id, f_warehouse_id, f_cost_center_id, f_printer_id, f_transbank_machine_id, f_state;
  var f = new Date();
  f_id = ( !id || id == '' ) ?f_id = "" : f_id = "id = " + id + ", ";
  f_branchoffice_id = ( !branchoffice_id || branchoffice_id == '' ) ?f_branchoffice_id = "" : f_branchoffice_id = "branchoffice_id = '" + branchoffice_id + "', ";
  f_description = ( !description || description == '' ) ?f_description = "" : f_description = " description = '" + description + "', ";
  f_posmachine_id = ( !posmachine_id || posmachine_id == '' ) ?f_posmachine_id = "" : f_posmachine_id = " posmachine_id = " + posmachine_id + ", ";
  f_warehouse_id = ( !warehouse_id || warehouse_id == '' ) ?f_warehouse_id = "" : f_warehouse_id = "warehouse_id = " + warehouse_id + ", ";
  f_cost_center_id = ( !cost_center_id ||cost_center_id == '' ) ?f_cost_center_id = "" : f_cost_center_id = "cost_center_id = " + cost_center_id + ", ";
  f_printer_id = ( !printer_id || printer_id == '' ) ?f_printer_id = "" : f_printer_id = "printer_id = " + printer_id + ", ";
  f_transbank_machine_id = ( !transbank_machine_id || transbank_machine_id == '' ) ?f_transbank_machine_id = "" : f_transbank_machine_id = "transbank_machine_id = " + transbank_machine_id + ", ";
  f_state = ( !state || state == '' ) ?f_state = "" : f_state = "state = " + state + ", ";

  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const crtPutQuery = "UPDATE cash_register_types SET " + f_id + f_branchoffice_id + f_description + f_posmachine_id + f_warehouse_id + f_cost_center_id + f_printer_id + f_transbank_machine_id + f_state + "updated_at = '" + datenow + "'  WHERE id = " + id_params
  const putcrt = await query(crtPutQuery, mysql);
  console.log(crtPutQuery);
  return putcrt;
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
  getCRT,
  //AddCRT,
  PutCRT
}