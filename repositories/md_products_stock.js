/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getProductsStock = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  const mysql = createConnectMysql(host, bd_name)
  const productsStock = await queryGetAllProducts(page, mysql, limit, offset)
  let jsonResult = {
    'total_rows': total_elementos,
    'total_page': total_paginas,
    'number_pagination': productsStock.length,
    'page': page,
    'data': productsStock
  }
  return jsonResult;
}

const queryGetAllProducts = async (page, mysql, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
  // consulta de datos con numero de paginas y offset
  const productsQuery = "SELECT product_stocks.product_id as products_id, products.description, warehouses.description as warehouses_description, product_stocks.stock FROM product_stocks INNER JOIN products ON product_stocks.id = products.id INNER JOIN warehouses ON product_stocks.warehouse_id = warehouses.id WHERE 1+1 LIMIT " + limit + " OFFSET " + offset
  const product = await query(productsQuery, mysql);
  const totalQuery = "SELECT COUNT(*) AS id FROM product_stocks INNER JOIN products ON product_stocks.id = products.id INNER JOIN warehouses ON product_stocks.warehouse_id = warehouses.id WHERE 1+1 "
  const total = await query(totalQuery, mysql);

  total_elementos = total[0]['id']
  total_paginas= Math.ceil(total_elementos/100)
  return product;
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
  getProductsStock
}