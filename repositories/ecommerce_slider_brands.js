/*
-------------------------------------TABLA SIMPLE--------------------------------------
*/

//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getEcommerceBrands = async (bd_name, host, page) => {//Funcion de tipo asincronica.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  const mysql = createConnectMysql(host, bd_name)
  const ebrands = await queryGetAllEcommerceBrands(page, mysql, limit, offset)
  let jsonResult = {
    'total_rows': total_elementos,
    'total_page': total_paginas,
    'number_pagination': ebrands.length,
    'page': page,
    'data': ebrands
  }
  return jsonResult;
}

const queryGetAllEcommerceBrands = async (page, mysql, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
  // consulta de datos con numero de paginas y offset
  const ebrandQuery = "SELECT ecommerce_slider_brands.id, ecommerce_slider_brands.slider_img FROM ecommerce_slider_brands LIMIT " + limit + " OFFSET " + offset
  const ecommerce = await query(ebrandQuery, mysql);
  const totalQuery = "SELECT COUNT(*) AS id FROM ecommerce_slider_brands "
  const total = await query(totalQuery, mysql);

  total_elementos = total[0]['id']
  total_paginas= Math.ceil(total_elementos/100)
  return ecommerce;
}

const getAddEcommerceBrands= async (bd_name, host, id, slider_img) => {
  var id, slider_img;
  var f = new Date();
  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const ecommercebrandsAddQuery = "INSERT INTO ecommerce_slider_brands (id, slider_img, created_at, updated_at) VALUES" + " (" + id + ", '" + slider_img + "', '" + datenow + "', '" + datenow + "')"
  const addecommercebrands = await query(ecommercebrandsAddQuery, mysql);
  return addecommercebrands;
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
  getEcommerceBrands,
  getAddEcommerceBrands
}