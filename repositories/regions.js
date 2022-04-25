/*
-------------------------------------TABLA COMPUESTA (E/R por COUNTRIES)--------------------------------------
*/
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getRegions = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  const mysql = createConnectMysql(host, bd_name)
  const regions = await queryGetAllRegions(page, mysql, limit, offset)
  let jsonResult = {
    'total_rows': total_elementos,
    'total_pagina': total_paginas,
    'number_pagination': regions.length,
    'page': page,
    'data': regions
  }
  return jsonResult;
}

const queryGetAllRegions = async (page, mysql, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
  // consulta de datos con numero de paginas y offset
  const regionsQuery = "SELECT regions.id, regions.code, regions.description, regions.country_id FROM regions WHERE deleted_at IS NULL LIMIT " + limit + " OFFSET " + offset
  const region = await query(regionsQuery, mysql);
  const totalQuery = "SELECT COUNT(*) AS id FROM regions WHERE deleted_at IS NULL"
  const total = await query(totalQuery, mysql);

  total_elementos = total[0]['id']
  total_paginas = Math.ceil(total_elementos/100)
  return region;
}

const getAddRegions = async (bd_name, host, id, code, description, country_id) => {
  var id, code, description, country_id;
  var f = new Date();
  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const regionsAddQuery = "INSERT INTO regions (id, code, description, country_id, created_at, updated_at) VALUES" + " (" + id + ", '" + code + "', '" + description + "', " + country_id + ", '" + datenow + "', '" + datenow + "')"
  const addregions = await query(regionsAddQuery, mysql);
  return addregions;
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
  getRegions,
  getAddRegions
}