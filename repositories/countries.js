/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getCountries = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  const mysql = createConnectMysql(host, bd_name)
  const countries = await queryGetAllCountries(page, mysql, limit, offset)
  let jsonResult = {
    'total_rows': total_elementos,
    'total_page': total_paginas,
    'number_pagination': countries.length,
    'page': page,
    'data': countries
  }
  return jsonResult;
}

const queryGetAllCountries = async (page, mysql, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
  // consulta de datos con numero de paginas y offset
  const countriesQuery = "SELECT countries.id, countries.`code`, countries.description FROM countries LIMIT " + limit + " OFFSET " + offset
  const countrie = await query(countriesQuery, mysql);
  const totalQuery = "SELECT COUNT(*) AS id FROM countries "
  const total = await query(totalQuery, mysql);

  total_elementos = total[0]['id']
  total_paginas= Math.ceil(total_elementos/100)
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