/*
-------------------------------------TABLA COMPUESTA (E/R por BRANCH_OFFICE)--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getPrinters = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  const mysql = createConnectMysql(host, bd_name)
  const printers = await queryGetAllPrinters(page, mysql)
  let jsonResult = {
    'numero elementos': printers.length,
    'numero paginas': page,
    'Printers': printers
  }
  return jsonResult;
}

const queryGetAllPrinters = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  // consulta de datos con numero de paginas y offset
  const printersQuery = "select * from printers limit " + limit + " OFFSET " + offset
  const printer = await query(printersQuery, mysql);
  return printer;
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
  getPrinters
}