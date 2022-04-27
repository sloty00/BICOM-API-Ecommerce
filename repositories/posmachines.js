/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getPosMachines = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  const mysql = createConnectMysql(host, bd_name)
  const pmachines = await queryGetAllPosMachines(page, mysql, limit, offset)
  let jsonResult = {
    'total_rows': total_elementos,
    'total:page': total_paginas,
    'number_pagination': pmachines.length,
    'page': page,
    'data': pmachines
  }
  return jsonResult;
}

const queryGetAllPosMachines = async (page, mysql, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
  // consulta de datos con numero de paginas y offset
  const pmachinesQuery = "SELECT posmachines.id, posmachines.`code`, posmachines.description, posmachines.mac_address FROM posmachines WHERE deleted_at IS NULL LIMIT " + limit + " OFFSET " + offset
  const pmachine = await query(pmachinesQuery, mysql);
  const totalQuery = "SELECT COUNT(*) AS id FROM posmachines WHERE deleted_at IS NULL"
  const total = await query(totalQuery, mysql);

  total_elementos = total[0]['id']
  total_paginas = Math.ceil(total_elementos/100)
  return pmachine;
}

const AddPosmachines = async (bd_name, host, id, code, description, mac_address) => {
  var id, code, description, mac_address;
  var f = new Date();
  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const posmachinesAddQuery = "INSERT INTO posmachines (id, code, description, mac_address, created_at, updated_at) VALUES" + " (" + id + ", '" + code + "', '" + description + "', '" + mac_address + "', '" + datenow + "', '" + datenow + "')"
  const addposmachines = await query(posmachinesAddQuery, mysql);
  return addposmachines;
}

const PutPosmachines = async (bd_name, host, id_params, id, code, description, mac_address) => {
  var id, code, description, mac_address;
  var f = new Date();
  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const posmachinesPutQuery = "UPDATE posmachines SET id = " + id + ", code = '" + code + "', description = '" + description + "', mac_address = '" + mac_address + "', updated_at = '" + datenow + "'  WHERE id = " + id_params
  const putposmachines = await query(posmachinesPutQuery, mysql);
  console.log(posmachinesPutQuery);
  return putposmachines;
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
  getPosMachines,
  AddPosmachines,
  PutPosmachines
}