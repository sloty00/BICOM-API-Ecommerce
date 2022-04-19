/*
-------------------------------------TABLA COMPUESTA (E/R por GROUP)--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getSubGroups = async (bd_name, host, page) => {//Funcion de tipo asincronica.

  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  const mysql = createConnectMysql(host, bd_name)
  const subgroups = await queryGetAllSubgroups(page, mysql, limit, offset)
  let jsonResult = {
    'total_rows': total_elementos,
    'total_page': total_paginas,
    'number_pagination': subgroups.length,
    'page': page,
    'data': subgroups
  }
  return jsonResult;
}

const queryGetAllSubgroups = async (page, mysql, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
  // consulta de datos con numero de paginas y offset
  const subgroupsQuery = "SELECT sub_groups.id, sub_groups.description, sub_groups.group_id FROM sub_groups WHERE deleted_at IS NULL LIMIT " + limit + " OFFSET " + offset
  const subgroup = await query(subgroupsQuery, mysql);
  const totalQuery = "SELECT COUNT(*) AS id FROM sub_groups WHERE deleted_at IS NULL"
  const total = await query(totalQuery, mysql);

  total_elementos = total[0]['id']
  total_paginas = Math.ceil(total_elementos/100)
  return subgroup;
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
  getSubGroups
}