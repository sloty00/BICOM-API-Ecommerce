/*
-------------------------------------TABLA COMPUESTA (E/R)--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getCRT = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  const mysql = createConnectMysql(host, bd_name)
  const crts = await queryGetAllCRT(page, mysql)
  let jsonResult = {
    'numero elementos': crts.length,
    'numero paginas': page,
    'Cash Register Types': crts
  }
  return jsonResult;
}

const queryGetAllCRT = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  // consulta de datos con numero de paginas y offset
  const crtQuery = "select * from cash_register_types limit " + limit + " OFFSET " + offset
  const crt= await query(crtQuery, mysql);
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