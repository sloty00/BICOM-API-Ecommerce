/*
-------------------------------------TABLA COMPUESTA (E/R por REGIONS)--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getCities = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  const mysql = createConnectMysql(host, bd_name)
  const cities = await queryGetAllCities(page, mysql)
  let jsonResult = {
    'numero elementos': cities.length,
    'numero paginas': page,
    'Cities': cities
  }
  return jsonResult;
}

const queryGetAllCities = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  // consulta de datos con numero de paginas y offset
  const citiesQuery = "select * from cities limit " + limit + " OFFSET " + offset
  const citie= await query(citiesQuery, mysql);
  return citie;
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
  getCities
}