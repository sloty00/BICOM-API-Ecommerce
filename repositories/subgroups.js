/*
-------------------------------------TABLA COMPUESTA (E/R por GROUP)--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getSubGroups = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  const mysql = createConnectMysql(host, bd_name)
  const subgroups = await queryGetAllSubgroups(page, mysql)
  let jsonResult = {
    'numero elementos': subgroups.length,
    'numero paginas': page,
    'Sub Groups': subgroups
  }
  return jsonResult;
}

const queryGetAllSubgroups = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  // consulta de datos con numero de paginas y offset
  const subgroupsQuery = "select * from sub_groups limit " + limit + " OFFSET " + offset
  const subgroup = await query(subgroupsQuery, mysql);
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