/*
-------------------------------------TABLA COMPUESTA (E/R)--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getCRT = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  const mysql = createConnectMysql(host, bd_name)
  const crts = await queryGetAllCRT(page, mysql)
  let jsonResult = {
    'total_rows': total_elementos,
    'total_page':total_paginas,
    'number_pagination': crts.length,
    'page': page,
    'data': crts
  }
  return jsonResult;
}

const queryGetAllCRT = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  // consulta de datos con numero de paginas y offset
  const crtQuery = "SELECT cash_register_types.id, cash_register_types.branchoffice_id, cash_register_types.description, cash_register_types.posmachine_id, cash_register_types.warehouse_id, cash_register_types.cost_center_id, cash_register_types.printer_id, cash_register_types.transbank_machine_id, cash_register_types.state FROM cash_register_types LIMIT " + limit + " OFFSET " + offset
  const crt= await query(crtQuery, mysql);
  const totalQuery = "SELECT COUNT(*) AS id FROM cash_register_types "
  const total= await query(totalQuery, mysql);

  total_elementos = total[0]['id']
  total_paginas = Math.ceil(total_elementos/100)
  return crt;
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
  getCRT
}