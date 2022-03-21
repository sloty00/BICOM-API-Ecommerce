/*
--------------------------------------------TABLA BASE---------------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getWarehouses = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  const mysql = createConnectMysql(host, bd_name)
  const warehouses = await queryGetAllWarehouses(page, mysql)
  let jsonResult = {
    'numero elementos': warehouses.length,
    'numero paginas': page,
    'Warehouses': warehouses
  }
  return jsonResult;
}

const queryGetAllWarehouses = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  // consulta de datos con numero de paginas y offset
  const warehousesQuery = "select * from warehouses limit " + limit + " OFFSET " + offset
  const warehouse= await query(warehousesQuery, mysql);
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