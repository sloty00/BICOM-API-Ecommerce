const { createConnectMysql } = require("../config/dbConnect")

const getCustomers = async (bd_name, host, page) => {
  const mysql = createConnectMysql(host, bd_name)
  const customers = await queryCustomers(page, mysql)
  let jsonResult = {
    'numero elementos': customers.length,
    'numero paginas': page,
    'productos': customers
  }
  return jsonResult;
}

const queryCustomers = async (page, mysql) => {
  // limite de 100
  const limit = 100
  // numeros paginas

  // calcula offset
  const offset = (page - 1) * limit
  // consulta de datos con numero de paginas y offset
  const customQuery = "select * from customer_suppliers limit " + limit + " OFFSET " + offset
  const custom = await query(customQuery, mysql);
  return custom;
}

//Deberia ir en herlpers
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

module.exports = {
  getCustomers
}