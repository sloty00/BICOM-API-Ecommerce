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

const AddSubgroups = async (bd_name, host, id, description, group_id) => {
  var id, description, group_id;
  var f = new Date();
  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const subgroupsAddQuery = "INSERT INTO sub_groups (id, description, group_id, created_at, updated_at) VALUES" + " (" + id + ", '" + description + "', " + group_id + ", '" + datenow + "', '" + datenow + "')"
  const addsubgroups = await query(subgroupsAddQuery, mysql);
  return addsubgroups;
}

const PutSubGroups = async (bd_name, host, id_params, id, description, group_id) => {
  var id, description, group_id;
  var f_id, f_description, f_group_id
  var f = new Date();

  f_id = ( !id || id == '' ) ?f_id = "" : f_id = "id = " + id + ", ";
  f_description = ( !description || description == '' ) ?f_description = "" : f_description = "description = '" + description + "', ";
  f_group_id = ( !group_id || group_id == '' ) ?f_group_id = "" : f_group_id = "group_id = '" + group_id + "', ";

  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const subgroupsPutQuery = "UPDATE sub_groups SET " + f_id + f_description + f_group_id + "updated_at = '" + datenow + "'  WHERE id = " + id_params
  const putsubgroups = await query(subgroupsPutQuery, mysql);
  console.log(subgroupsPutQuery);
  return putsubgroups;
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
  getSubGroups,
  AddSubgroups,
  PutSubGroups
}