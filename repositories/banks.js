/*
-------------------------------------------TABLA BASE---------------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getBanks = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  const mysql = createConnectMysql(host, bd_name)
  const banks = await queryGetAllBanks(page, mysql, limit, offset)
  let jsonResult = {
    'total_rows': total_elementos,
    'total_page': total_paginas,
    'number_pagination': banks.length,
    'page': page,
    'data': banks
  }
  return jsonResult;
}

const queryGetAllBanks = async (page, mysql, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
  // consulta de datos con numero de paginas y offset
  const banksQuery = "SELECT banks.id, banks.`code`, banks.description FROM banks LIMIT " + limit + " OFFSET " + offset
  const bank= await query(banksQuery, mysql);
  const totalQuery = "SELECT COUNT(*) AS id FROM banks "
  const total= await query(totalQuery, mysql);

  total_elementos = total[0]['id']
  total_paginas = Math.ceil(total_elementos/100)
  return bank;
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
  getBanks
}