/*
-------------------------------------TABLA COMPUESTA (E/R por CITIES)--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getCommunes = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  const mysql = createConnectMysql(host, bd_name)
  const communes = await queryGetAllCommunes(page, mysql)
  let jsonResult = {
    'numero elementos': communes.length,
    'numero paginas': page,
    'Communes': communes
  }
  return jsonResult;
}

const queryGetAllCommunes = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  // consulta de datos con numero de paginas y offset
  const communesQuery = "select * from communes limit " + limit + " OFFSET " + offset
  const commune= await query(communesQuery, mysql);
  return commune;
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
  getCommunes
}