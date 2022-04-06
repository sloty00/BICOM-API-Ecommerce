/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getActivities = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  const mysql = createConnectMysql(host, bd_name)
  const activities = await queryGetAllActivities(page, mysql)
  let jsonResult = {
    'total_rows': total_elementos,
    'total_page': total_page,
    'number_pagination': activities.length,
    'page': page,
    'data': activities
  }
  return jsonResult;
}

const queryGetAllActivities = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  // consulta de datos con numero de paginas y offset
  const activitiesQuery = "SELECT activities.id, activities.`code`, activities.description FROM activities LIMIT " + limit + " OFFSET " + offset
  const activitie = await query(activitiesQuery, mysql);
  const totalQuery = "SELECT COUNT(*) AS id FROM activities "
  const total = await query(totalQuery, mysql);

  total_elementos = total[0]['id']
  total_page = Math.ceil(total_elementos/100)
  return activitie;
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
  getActivities
}