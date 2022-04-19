/*
-------------------------------------TABLA COMPUESTA--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getCreditCards = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  const mysql = createConnectMysql(host, bd_name)
  const ccards = await queryGetAllCreditCards(page, mysql, limit, offset)
  let jsonResult = {
    'total_rows': total_elementos,
    'total_page': total_paginas,
    'number_pagination': ccards.length,
    'page': page,
    'data': ccards
  }
  return jsonResult;
}

const queryGetAllCreditCards = async (page, mysql, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
  // consulta de datos con numero de paginas y offset
  const ccardsQuery = "SELECT credit_cards.id, credit_cards.`code`, credit_cards.description FROM credit_cards LIMIT " + limit + " OFFSET " + offset
  const ccard = await query(ccardsQuery, mysql);
  const totalQuery = "SELECT COUNT(*) AS id FROM credit_cards "
  const total = await query(totalQuery, mysql);

  total_elementos = total[0]['id']
  total_paginas= Math.ceil(total_elementos/100)
  return ccard;
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
  getCreditCards
}