/*
-------------------------------------TABLA COMPUESTA (E/R por REGIONS)--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getCities = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  const mysql = createConnectMysql(host, bd_name)
  const cities = await queryGetAllCities(page, mysql)
  let jsonResult = {
    'total_rows': total_elementos,
    'total_page': total_paginas,
    'number_pagination': cities.length,
    'page': page,
    'data': cities
  }
  return jsonResult;
}

const queryGetAllCities = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  // consulta de datos con numero de paginas y offset
  const citiesQuery = "SELECT cities.id, cities.`code`, cities.description, cities.region_id FROM cities LIMIT " + limit + " OFFSET " + offset
  const citie= await query(citiesQuery, mysql);
  const totalQuery = "SELECT COUNT(*) AS id FROM cities"
  const total= await query(totalQuery, mysql);

  total_elementos = total[0]['id']
  total_paginas = Math.ceil(total_elementos/100)
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