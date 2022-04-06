/*
--------------------------------------------TABLA BASE---------------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getWarehouses = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  const mysql = createConnectMysql(host, bd_name)
  const warehouses = await queryGetAllWarehouses(page, mysql)
  let jsonResult = {
    'total_rows': total_elementos,
    'total_pages':total_paginas,
    'number_pagination': warehouses.length,
    'page': page,
    'data': warehouses
  }
  return jsonResult;
}

const queryGetAllWarehouses = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  // consulta de datos con numero de paginas y offset
  const warehousesQuery = "SELECT warehouses.id, warehouses.description, warehouses.address, warehouses.is_ecommerce FROM warehouses LIMIT " + limit + " OFFSET " + offset
  const warehouse= await query(warehousesQuery, mysql);
  const totalQuery = "SELECT COUNT(*) AS id FROM warehouses"
  const total= await query(totalQuery, mysql);
  
  total_elementos = total[0]['id']
  total_paginas = Math.ceil(total_elementos/100)
  return warehouse;
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
  getWarehouses
}