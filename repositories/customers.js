/*
-------------------------------------TABLA COMPUESTA (E/R)--------------------------------------
*/

//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getCustomers = async (bd_name, host, page, is_active, is_customers, is_supplier, region_id, city_id, communes_id, activity_id) => {//Funcion de tipo asincronica.
    var filter_isactive = ""
    var filter_iscustomers = ""
    var filter_issupplier = ""
    var filter_regionid = ""
    var filter_cityid = ""
    var filter_communesid = ""
    var filter_activityid = ""

  const mysql = createConnectMysql(host, bd_name)

  switch (is_active) {
    case '0':
        filter_isactive="AND customer_suppliers.is_active= 0 ";
        console.log('No esta Activa');
    break;

    case '1':
        filter_isactive="AND customer_suppliers.is_active= 1 ";
        console.log('Esta Activa');
    break;
  }

  switch (is_customers) {
    case '0':
        filter_iscustomers="AND customer_suppliers.is_customer= 0 ";
        console.log('No es cliente');
    break;

    case '1':
        filter_iscustomers="AND customer_suppliers.is_customer= 1 ";
        console.log('Si es cliente');
    break;
  }

  switch (is_supplier) {

    case '0':
        filter_issupplier="AND customer_suppliers.is_supplier= 0 ";
        console.log('No es proveedor');
    break;

    case '1':
        filter_issupplier="AND customer_suppliers.is_supplier= 1 ";
        console.log('Si es proveedor');
    break;
  }

  switch (region_id) {
    case region_id:
        filter_regionid="AND customer_suppliers.region_id= "+`${region_id}`;
        console.log(region_id);
    break;
  }

  switch (city_id) {
    case city_id:
        filter_cityid="AND customer_suppliers.city_id= "+`${city_id}`;
        console.log(city_id);
    break;
  }

  switch (communes_id) {
    case communes_id:
        filter_communesid="AND customer_suppliers.commune_id= "+`${communes_id}`;
        console.log(communes_id);
    break;
  }

  switch (activity_id) {
    case activity_id:
        filter_activityid="AND customer_suppliers.activity_id= "+`${activity_id}`;
        console.log(activity_id);
    break;
  }

  const customers = await queryGetAllCustomers(page, mysql, filter_isactive, filter_iscustomers, filter_issupplier, filter_regionid, filter_cityid, filter_communesid, filter_activityid)
  let jsonResult = {
    'total_rows': total_elementos,
    'total_page': total_paginas,
    'number_pagination': customers.length,
    'page': page,
    'data': customers
  }
  return jsonResult;
}

const queryGetAllCustomers = async (page, mysql, filter_isactive, filter_iscustomers, filter_issupplier, filter_regionid, filter_cityid, filter_communesid, filter_activityid) => {//Funcion de tipo asincronica, realiza la consulta.
  // limite de 100
  const limit = 100
  // calcula offset
  const offset = (page - 1) * limit
  // consulta de datos con numero de paginas y offset
  const customQuery = "SELECT customer_suppliers.id, customer_suppliers.rut, customer_suppliers.fantasy_name, customer_suppliers.business_name, customer_suppliers.activity_id, customer_suppliers.country_id, customer_suppliers.region_id, customer_suppliers.city_id, customer_suppliers.commune_id, customer_suppliers.address, customer_suppliers.email, customer_suppliers.email_dte, customer_suppliers.website, customer_suppliers.is_customer, customer_suppliers.is_supplier, customer_suppliers.is_active, customer_suppliers.phone, customer_suppliers.phone_two, customer_suppliers.seller_id, customer_suppliers.list_price_id, customer_suppliers.expired_days, customer_suppliers.limit_amount, customer_suppliers.is_customer_simple, customer_suppliers.can_invoice, customer_suppliers.can_ballot, customer_suppliers.can_no_ballot FROM customer_suppliers WHERE customer_suppliers.deleted_at is null" + " " + filter_isactive + " " + filter_iscustomers + " " + filter_issupplier + " " + filter_regionid + " " + filter_cityid + " " + filter_communesid + " " + filter_activityid +" LIMIT " + limit + " OFFSET " + offset
  const custom = await query(customQuery, mysql);
  const totalQuery = "SELECT COUNT(*) AS id FROM customer_suppliers WHERE customer_suppliers.deleted_at " + filter_isactive + " " + filter_iscustomers + " " + filter_issupplier + " " + filter_regionid + " " + filter_cityid + " " + filter_communesid +" "+ filter_activityid
  const total = await query(totalQuery, mysql);

  total_elementos = total[0]['id']
  total_paginas= Math.ceil(total_elementos/100)
  return custom;
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
  getCustomers
}