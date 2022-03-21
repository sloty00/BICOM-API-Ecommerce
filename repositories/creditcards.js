/*
-------------------------------------TABLA COMPUESTA--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getCreditCards = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  const mysql = createConnectMysql(host, bd_name)
  const ccards = await queryGetAllCreditCards(page, mysql)
  let jsonResult = {
    'numero elementos': ccards.length,
    'numero paginas': page,
    'Credit Cards': ccards
  }
  return jsonResult;
}

const queryGetAllCreditCards = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  // consulta de datos con numero de paginas y offset
  const ccardsQuery = "select * from credit_cards limit " + limit + " OFFSET " + offset
  const ccard = await query(ccardsQuery, mysql);
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