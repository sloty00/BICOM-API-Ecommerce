/*
-------------------------------------------TABLA BASE------------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getCostCenters = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  const mysql = createConnectMysql(host, bd_name)
  const ccenters = await queryGetAllCostCenters(page, mysql)
  let jsonResult = {
    'numero elementos': ccenters.length,
    'numero paginas': page,
    'Cost Centers': ccenters
  }
  return jsonResult;
}

const queryGetAllCostCenters = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  // consulta de datos con numero de paginas y offset
  const ccentersQuery = "select * from cost_centers limit " + limit + " OFFSET " + offset
  const ccenter= await query(ccentersQuery, mysql);
  return ccenter;
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
  getCostCenters
}