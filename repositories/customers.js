/*
-------------------------------------TABLA COMPUESTA (E/R)--------------------------------------
*/

//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getCustomers = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  const mysql = createConnectMysql(host, bd_name)
  const customers = await queryGetAllCustomers(page, mysql)
  let jsonResult = {
    'numero elementos': customers.length,
    'numero paginas': page,
    'Custommers Suppliers': customers
  }
  return jsonResult;
}

const queryGetAllCustomers = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  // consulta de datos con numero de paginas y offset
  const customQuery = "select * from customer_suppliers limit " + limit + " OFFSET " + offset
  const custom = await query(customQuery, mysql);
  return custom;
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
  getCustomers
}