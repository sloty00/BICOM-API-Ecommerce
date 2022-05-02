/*
-------------------------------------TABLA COMPUESTA (E/R por BRANCH_OFFICE)--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getPrinters = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  const mysql = createConnectMysql(host, bd_name)
  const printers = await queryGetAllPrinters(page, mysql, limit, offset)
  let jsonResult = {
    'total_rows': total_elementos,
    'total_page': total_paginas,
    'number_pagination': printers.length,
    'page': page,
    'data': printers
  }
  return jsonResult;
}

const queryGetAllPrinters = async (page, mysql, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
  // consulta de datos con numero de paginas y offset
  const printersQuery = "SELECT printers.id, printers.description, printers.is_active, printers.branchoffice_id FROM printers WHERE deleted_at IS NULL LIMIT " + limit + " OFFSET " + offset
  const printer = await query(printersQuery, mysql);
  const totalQuery = "SELECT COUNT(*) AS id FROM printers WHERE deleted_at IS NULL"
  const total = await query(totalQuery, mysql);

  total_elementos = total[0]['id']
  total_paginas = Math.ceil(total_elementos/100);
  return printer;
}

const AddPrinters = async (bd_name, host, id, description, is_active, branchoffice_id) => {
  var id, description, is_active, branchoffice_id;
  var f = new Date();
  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const printersAddQuery = "INSERT INTO printers (id, description, is_active, branchoffice_id, created_at, updated_at) VALUES" + " (" + id + ", '" + description + "', '" + is_active + "', " + branchoffice_id + ", '" + datenow + "', '" + datenow + "')"
  const addprinters = await query(printersAddQuery, mysql);
  return addprinters;
}

const PutPrinters = async (bd_name, host, id_params, id, description, is_active, branchoffice_id) => {
  var id, description, is_active, branchoffice_id;
  var f_id, f_description, f_is_active, f_branchoffice_id;
  var f = new Date();
  f_id = ( !id || id == '' ) ?f_id = "" : f_id = "id = " + id + ", ";
  f_description = ( !description || description == '' ) ?f_description = "" : f_description = "description = '" + description + "', ";
  f_is_active = ( !is_active || is_active == '' ) ?f_is_active = "" : f_is_active = "is_active = " + is_active + ", ";
  f_branchoffice_id = ( !branchoffice_id || branchoffice_id == '' ) ?f_branchoffice_id = "" : f_branchoffice_id = "branchoffice_id = " + branchoffice_id + ", ";

  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const printersPutQuery = "UPDATE printers SET " + f_id + f_description + f_is_active + f_branchoffice_id + "updated_at = '" + datenow + "'  WHERE id = " + id_params
  const putprinters = await query(printersPutQuery, mysql);
  console.log(printersPutQuery);
  return putprinters;
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
  getPrinters,
  AddPrinters,
  PutPrinters
}