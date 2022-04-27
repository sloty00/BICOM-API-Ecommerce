/*
--------------------------------------------TABLA BASE---------------------------------------------
*/
//Declaracion de Constantes.
const { add } = require("nodemon/lib/rules")
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getWarehouses = async (bd_name, host, page) => {//Funcion de tipo asincronica.

  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  const mysql = createConnectMysql(host, bd_name)
  const warehouses = await queryGetAllWarehouses(page, mysql, limit, offset)
  let jsonResult = {
    'total_rows': total_elementos,
    'total_pages':total_paginas,
    'number_pagination': warehouses.length,
    'page': page,
    'data': warehouses
  }
  return jsonResult;
}

const queryGetAllWarehouses = async (page, mysql, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
  // consulta de datos con numero de paginas y offset
  const warehousesQuery = "SELECT warehouses.id, warehouses.description, warehouses.address, warehouses.is_ecommerce FROM warehouses WHERE deleted_at IS NULL LIMIT " + limit + " OFFSET " + offset
  const warehouse= await query(warehousesQuery, mysql);
  const totalQuery = "SELECT COUNT(*) AS id FROM warehouses WHERE deleted_at IS NULL"
  const total= await query(totalQuery, mysql);
  
  total_elementos = total[0]['id']
  total_paginas = Math.ceil(total_elementos/100)
  return warehouse;
}

const AddWarehouses = async (bd_name, host, id, code, description, address, is_ecommerce) => {
  var id, code, description, address, is_ecommerce;
  var f = new Date();
  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const warehousesAddQuery = "INSERT INTO warehouses (id, `code`, description, address, is_ecommerce, created_at, updated_at) VALUES" + " (" + id + ", '" + code + "', '" + description + "', '" + address+ "', " + is_ecommerce + ", '" + datenow + "', '" + datenow + "')"
  const addwarehouses = await query(warehousesAddQuery, mysql);
  return addwarehouses;
}

const PutWarehouses = async (bd_name, host, id_params, id, code, description, address, is_ecommerce) => {
  var id, code, description, address, is_ecommerce;
  var f = new Date();
  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const warehousesPutQuery = "UPDATE warehouses SET id = " + id + ", code = '" + code + "', description = '" + description + "', address = '" + address + "', is_ecommerce = " + is_ecommerce + ", updated_at = '" + datenow + "'  WHERE id = " + id_params
  const putwarehouses = await query(warehousesPutQuery, mysql);
  console.log(warehousesPutQuery);
  return putwarehouses;
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
  getWarehouses,
  AddWarehouses,
  PutWarehouses
}