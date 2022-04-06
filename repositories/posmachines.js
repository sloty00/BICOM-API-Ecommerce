/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getPosMachines = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  const mysql = createConnectMysql(host, bd_name)
  const pmachines = await queryGetAllPosMachines(page, mysql)
  let jsonResult = {
    'total_rows': total_elementos,
    'total:page': total_paginas,
    'number_pagination': pmachines.length,
    'page': page,
    'data': pmachines
  }
  return jsonResult;
}

const queryGetAllPosMachines = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  // consulta de datos con numero de paginas y offset
  const pmachinesQuery = "SELECT posmachines.id, posmachines.`code`, posmachines.description, posmachines.mac_address FROM posmachines LIMIT " + limit + " OFFSET " + offset
  const pmachine = await query(pmachinesQuery, mysql);
  const totalQuery = "SELECT COUNT(*) AS id FROM posmachines "
  const total = await query(totalQuery, mysql);

  total_elementos = total[0]['id']
  total_paginas = Math.ceil(total_elementos/100)
  return pmachine;
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
  getPosMachines
}