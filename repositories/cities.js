/*
-------------------------------------TABLA COMPUESTA (E/R por REGIONS)--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getCities = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  const mysql = createConnectMysql(host, bd_name)
  const cities = await queryGetAllCities(page, mysql, limit, offset)
  let jsonResult = {
    'total_rows': total_elementos,
    'total_page': total_paginas,
    'number_pagination': cities.length,
    'page': page,
    'data': cities
  }
  return jsonResult;
}

const queryGetAllCities = async (page, mysql, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
  // consulta de datos con numero de paginas y offset
  const citiesQuery = "SELECT cities.id, cities.`code`, cities.description, cities.region_id FROM cities LIMIT " + limit + " OFFSET " + offset
  const citie= await query(citiesQuery, mysql);
  const totalQuery = "SELECT COUNT(*) AS id FROM cities"
  const total= await query(totalQuery, mysql);

  total_elementos = total[0]['id']
  total_paginas = Math.ceil(total_elementos/100)
  return citie;
}

const AddCities = async (bd_name, host, id, code, description, region_id) => {
  var id, code, description, region_id;
  var f = new Date();
  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const citiesAddQuery = "INSERT INTO cities (id, `code`, description, region_id, created_at, updated_at) VALUES" + " (" + id + ", '" + code + "', '" + description + "', "+ region_id + ", '" + datenow + "', '" + datenow + "')"
  const add = await query(citiesAddQuery, mysql);
  return add;
}

const PutCities = async (bd_name, host, id_params, id, code, description, region_id) => {
  var id, code, description, region_id;
  var f_id, f_code, f_description, f_region_id;
  var f = new Date();

  f_id = ( !id || id == '' ) ?f_id = "" : f_id = "id = " + id + ", ";
  f_code = ( !code || code == '' ) ?f_code = "" : f_code = "code = '" + code + "', ";
  f_description = ( !description || description == '' ) ?f_description = "" : f_description = " description = '" + description + "', ";
  f_region_id = ( !region_id || region_id == '' ) ?f_region_id = "" : f_region_id = " region_id = " + region_id + ", ";

  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const citiesPutQuery = "UPDATE cities SET " + f_id + f_code + f_description + f_region_id + "updated_at = '" + datenow + "'  WHERE id = " + id_params
  const putcities = await query(citiesPutQuery, mysql);
  console.log(citiesPutQuery);
  return putcities;
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
  getCities,
  AddCities,
  PutCities
}