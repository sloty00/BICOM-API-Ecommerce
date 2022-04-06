/*
-------------------------------------------TABLA BASE------------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getCostCenters = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  const mysql = createConnectMysql(host, bd_name)
  const ccenters = await queryGetAllCostCenters(page, mysql)
  let jsonResult = {
    'total_rows': total_elementos,
    'total_page': total_paginas,
    'numbre_pagination': ccenters.length,
    'page': page,
    'data': ccenters
  }
  return jsonResult;
}

const queryGetAllCostCenters = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  // consulta de datos con numero de paginas y offset
  const ccentersQuery = "SELECT cost_centers.id, cost_centers.`code`, cost_centers.description FROM cost_centers LIMIT " + limit + " OFFSET " + offset
  const ccenter= await query(ccentersQuery, mysql);

  const totalQuery = "SELECT COUNT(*) AS id FROM cost_centers "
  const total= await query(totalQuery, mysql);

  total_elementos = total[0]['id']
  total_paginas= Math.ceil(total_elementos/100)
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