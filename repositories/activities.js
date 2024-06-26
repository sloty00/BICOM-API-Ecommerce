/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getActivities = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  const limit = 100
  const offset = (page - 1) * limit
  const mysql = createConnectMysql(host, bd_name)

  const activities = await queryGetAllActivities(page, mysql, limit, offset)
  let jsonResult = {
    'total_rows': total_elementos,
    'total_page': total_page,
    'number_pagination': activities.length,
    'page': page,
    'data': activities
  }
  console.log(putcode);
  return jsonResult;
}

const queryGetAllActivities = async (page, mysql, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
  // consulta de datos con numero de paginas y offset
  const activitiesQuery = "SELECT activities.id, activities.`code`, activities.description FROM activities LIMIT " + limit + " OFFSET " + offset
  const activitie = await query(activitiesQuery, mysql);
  const totalQuery = "SELECT COUNT(*) AS id FROM activities "
  const total = await query(totalQuery, mysql);

  total_elementos = total[0]['id']
  total_page = Math.ceil(total_elementos/100)
  return activitie;
}

const AddActivities = async (bd_name, host, id, code, description) => {
  var f = new Date();
  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const activitiesAddQuery = "INSERT INTO activities (id, `code`, description, created_at, updated_at) VALUES" + " (" + id + ", " + code + ", '" + description + "', '" + datenow + "', '" + datenow + "')"
  const addactivities = await query(activitiesAddQuery, mysql);
  return addactivities;
}

const PutActivities = async (bd_name, host, id_params, id, code, description) => {
  var id, code, description;
  var f_id, f_code, f_description;
  var f = new Date();

  f_id = ( !id || id == '' ) ?f_id = "" : f_id = "id = " + id + ", ";
  f_code = ( !code || code == '' ) ?f_code = "" : f_code = "code = '" + code + "', ";
  f_description = ( !description || description == '' ) ?f_description = "" : f_description = "description = '" + description + "', ";

  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const activitiesPutQuery = "UPDATE activities SET " + f_id + f_code + f_description + "updated_at = '" + datenow + "'  WHERE id = " + id_params
  const putactivities = await query(activitiesPutQuery, mysql);
  console.log(activitiesPutQuery);
  return putactivities;
}

//Deberia ir en herlpers
//Controla los errores de conexion
const query = (sql, mysql) => {
  return new Promise((resolve, reject) => {
    mysql.query(sql,
       (err, rows) => {
      if (err) {
        return reject(err);
      }
      return resolve(rows)
    })
  })
}

//Exportamos la funcion para usar los datos en controller/products.js.
module.exports = {
  getActivities,
  AddActivities,
  PutActivities
}