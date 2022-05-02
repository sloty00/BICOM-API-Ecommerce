/*
-------------------------------------TABLA COMPUESTA (E/R por CITIES)--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getCommunes = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  const mysql = createConnectMysql(host, bd_name)
  const communes = await queryGetAllCommunes(page, mysql, limit, offset)
  let jsonResult = {
    'total_rows': total_elementos,
    'total_page': total_paginas,
    'number_pagination': communes.length,
    'page': page,
    'data': communes
  }
  return jsonResult;
}

const queryGetAllCommunes = async (page, mysql, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
  // consulta de datos con numero de paginas y offset
  const communesQuery = "SELECT communes.id, communes.`code`, communes.description, communes.city_id FROM communes LIMIT " + limit + " OFFSET " + offset
  const commune= await query(communesQuery, mysql);
  const totalQuery = "SELECT COUNT(*) AS id FROM communes "
  const total= await query(totalQuery, mysql);

  total_elementos = total[0]['id']
  total_paginas= Math.ceil(total_elementos/100)
  return commune;
}

const AddCommunes = async (bd_name, host, id, code, description, city_id) => {
  var id, code, description, city_id;
  var f = new Date();
  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const communesAddQuery = "INSERT INTO communes (id, `code`, description, city_id, created_at, updated_at) VALUES" + " (" + id + ", '" + code + "', '" + description + "', " + city_id + ", '" + datenow + "', '" + datenow + "')"
  const add = await query(communesAddQuery, mysql);
  return add;
}

const PutCommunes = async (bd_name, host, id_params, id, code, description, city_id) => {
  var id, code, description, city_id;
  var f_id, f_code, f_description, f_city_id;
  var f = new Date();

  f_id = ( !id || id == '' ) ?f_id = "" : f_id = "id = " + id + ", ";
  f_code = ( !code || code == '' ) ?f_code = "" : f_code = "code = '" + code + "', ";
  f_description = ( !description || description == '' ) ?f_description = "" : f_description = " description = '" + description + "', ";
  f_city_id = ( !city_id || city_id == '' ) ?f_city_id = "" : f_city_id = " city_id = " + city_id + ", ";

  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const communesPutQuery = "UPDATE communes SET " + f_id + f_code + f_description + f_city_id + "updated_at = '" + datenow + "'  WHERE id = " + id_params
  const putcommunes = await query(communesPutQuery, mysql);
  console.log(communesPutQuery);
  return putcommunes;
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
  getCommunes,
  AddCommunes,
  PutCommunes
}