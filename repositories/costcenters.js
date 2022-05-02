/*
-------------------------------------------TABLA BASE------------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getCostCenters = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  const mysql = createConnectMysql(host, bd_name)
  const ccenters = await queryGetAllCostCenters(page, mysql, limit, offset)
  let jsonResult = {
    'total_rows': total_elementos,
    'total_page': total_paginas,
    'numbre_pagination': ccenters.length,
    'page': page,
    'data': ccenters
  }
  return jsonResult;
}

const queryGetAllCostCenters = async (page, mysql, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
  // consulta de datos con numero de paginas y offset
  const ccentersQuery = "SELECT cost_centers.id, cost_centers.`code`, cost_centers.description FROM cost_centers LIMIT " + limit + " OFFSET " + offset
  const ccenter= await query(ccentersQuery, mysql);

  const totalQuery = "SELECT COUNT(*) AS id FROM cost_centers "
  const total= await query(totalQuery, mysql);

  total_elementos = total[0]['id']
  total_paginas= Math.ceil(total_elementos/100)
  return ccenter;
}

const AddCostCenters = async (bd_name, host, id, code, description) => {
  var id, code, description;
  var f = new Date();
  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const costcentersAddQuery = "INSERT INTO cost_centers (id, `code`, description, created_at, updated_at) VALUES" + " (" + id + ", '" + code + "', '" + description + "', '" + datenow + "', '" + datenow + "')"
  const add = await query(costcentersAddQuery, mysql);
  return add;
}

const PutCostCenters = async (bd_name, host, id_params, id, code, description) => {
  var id, code, description;
  var f_id, f_code, f_description;
  var f = new Date();

  f_id = ( !id || id == '' ) ?f_id = "" : f_id = "id = " + id + ", ";
  f_code = ( !code || code == '' ) ?f_code = "" : f_code = "code = '" + code + "', ";
  f_description = ( !description || description == '' ) ?f_description = "" : f_description = "description = '" + description + "', ";

  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const communesPutQuery = "UPDATE cost_centers SET " + f_id + f_code + f_description + "updated_at = '" + datenow + "'  WHERE id = " + id_params
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
  getCostCenters,
  AddCostCenters,
  PutCostCenters
}