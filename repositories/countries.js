/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getCountries = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  const mysql = createConnectMysql(host, bd_name)
  const countries = await queryGetAllCountries(page, mysql)
  let jsonResult = {
    'numero elementos': countries.length,
    'numero paginas': page,
    'Countries': countries
  }
  return jsonResult;
}

const queryGetAllCountries = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  // consulta de datos con numero de paginas y offset
  const countriesQuery = "select * from countries limit " + limit + " OFFSET " + offset
  const countrie = await query(countriesQuery, mysql);
  return countrie;
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
  getCountries
}