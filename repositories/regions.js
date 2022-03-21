/*
-------------------------------------TABLA COMPUESTA (E/R por COUNTRIES)--------------------------------------
*/
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getRegions = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  const mysql = createConnectMysql(host, bd_name)
  const regions = await queryGetAllRegions(page, mysql)
  let jsonResult = {
    'numero elementos': regions.length,
    'numero paginas': page,
    'Countries': regions
  }
  return jsonResult;
}

const queryGetAllRegions = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  // consulta de datos con numero de paginas y offset
  const regionsQuery = "select * from regions limit " + limit + " OFFSET " + offset
  const region = await query(regionsQuery, mysql);
  return region;
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
  getRegions
}