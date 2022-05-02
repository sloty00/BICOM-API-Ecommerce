/*
-------------------------------------TABLA COMPUESTA (E/R)--------------------------------------
*/

//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getCustomers = async (bd_name, host, page, is_active, is_customers, is_suppliers, region_id, city_id, communes_id, activity_id) => {//Funcion de tipo asincronica.
    var filter_isactive = ""
    var filter_iscustomers = ""
    var filter_issupplier = ""
    var filter_regionid = ""
    var filter_cityid = ""
    var filter_communesid = ""
    var filter_activityid = ""

    const limit = 100
    const offset = (page - 1) * limit
  const mysql = createConnectMysql(host, bd_name)


  if(is_active == '0' && is_active) {
    filter_isactive="AND (customer_suppliers.is_active= 0 OR customer_suppliers.is_active is null) ";
  } else if (is_active == '1' && is_active){
    filter_isactive="AND customer_suppliers.is_active= 1 ";
  }

  if(is_customers == '0' && is_customers) {
    filter_iscustomers="AND (customer_suppliers.is_customer= 0 OR customer_suppliers.is_customer is null) ";
  } else if (is_customers == '1' && is_customers){
    filter_iscustomers="AND customer_suppliers.is_customer= 1 ";
  }

  if(is_suppliers == '0' && is_suppliers) {
    filter_issupplier="AND (customer_suppliers.is_supplier= 0 OR customer_suppliers.is_supplier is null) ";
  } else if (is_suppliers == '1' && is_suppliers){
    filter_issupplier="AND customer_suppliers.is_supplier= 1 ";
  }

  switch (region_id !=="" && region_id) {
    case region_id:
        filter_regionid="AND customer_suppliers.region_id= "+`${region_id}`;
    break;
  }

  switch (city_id !=="" && city_id) {
    case city_id:
        filter_cityid="AND customer_suppliers.city_id= "+`${city_id}`;
    break;
  }

  switch (communes_id !=="" && communes_id) {
    case communes_id:
        filter_communesid="AND customer_suppliers.commune_id= "+`${communes_id}`;
    break;
  }

  switch (activity_id !=="" && activity_id) {
    case activity_id:
        filter_activityid="AND customer_suppliers.activity_id= "+`${activity_id}`;
    break;
  }

  const customers = await queryGetAllCustomers(page, mysql, filter_isactive, filter_iscustomers, filter_issupplier, filter_regionid, filter_cityid, filter_communesid, filter_activityid, limit, offset)
  let jsonResult = {
    'total_rows': total_elementos,
    'total_page': total_paginas,
    'number_pagination': customers.length,
    'page': page,
    'data': customers
  }
  return jsonResult;
}

const queryGetAllCustomers = async (page, mysql, filter_isactive, filter_iscustomers, filter_issupplier, filter_regionid, filter_cityid, filter_communesid, filter_activityid, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
  // consulta de datos con numero de paginas y offset
  const customQuery = "SELECT customer_suppliers.id, customer_suppliers.rut, customer_suppliers.fantasy_name, customer_suppliers.business_name, customer_suppliers.activity_id, customer_suppliers.country_id, customer_suppliers.region_id, customer_suppliers.city_id, customer_suppliers.commune_id, customer_suppliers.address, customer_suppliers.email, customer_suppliers.email_dte, customer_suppliers.website, customer_suppliers.is_customer, customer_suppliers.is_supplier, customer_suppliers.is_active, customer_suppliers.phone, customer_suppliers.phone_two, customer_suppliers.seller_id, customer_suppliers.list_price_id, customer_suppliers.expired_days, customer_suppliers.limit_amount, customer_suppliers.is_customer_simple, customer_suppliers.can_invoice, customer_suppliers.can_ballot, customer_suppliers.can_no_ballot FROM customer_suppliers WHERE customer_suppliers.deleted_at is null" + " " + filter_isactive + " " + filter_iscustomers + " " + filter_issupplier + " " + filter_regionid + " " + filter_cityid + " " + filter_communesid + " " + filter_activityid +" LIMIT " + limit + " OFFSET " + offset
  const custom = await query(customQuery, mysql);
  const totalQuery = "SELECT COUNT(*) AS id FROM customer_suppliers WHERE customer_suppliers.deleted_at is null " + filter_isactive + " " + filter_iscustomers + " " + filter_issupplier + " " + filter_regionid + " " + filter_cityid + " " + filter_communesid +" "+ filter_activityid
  const total = await query(totalQuery, mysql);
  total_elementos = total[0]['id']
  total_paginas= Math.ceil(total_elementos/100)
  return custom;
}

const AddCustomers = async (bd_name, host, id, rut, business_name, fantasy_name, activity_id, country_id, region_id, city_id, commune_id, address, email, email_dte, website, is_customer, is_supplier, is_active, phone, phone_two, payment_type, seller_id, list_price_id, expired_days, limit_amount, is_customer_simple, can_invoice, can_ballot, can_no_ballot) => {
    
  var id, rut, business_name, fantasy_name, activity_id, country_id, region_id, city_id, commune_id, address, email, email_dte, website, is_customer, is_supplier, is_active, phone, phone_two, payment_type, seller_id, list_price_id, expired_days, limit_amount, is_customer_simple, can_invoice, can_ballot, can_no_ballot;
  var f = new Date();
  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const customersAddQuery = "INSERT INTO customer_suppliers (id, rut, business_name, fantasy_name, activity_id, country_id, region_id, city_id, commune_id, address, email, email_dte, website, is_customer, is_supplier, is_active, phone, phone_two, payment_type, seller_id, list_price_id, expired_days, limit_amount, is_customer_simple, can_invoice, can_ballot, can_no_ballot, created_at, updated_at) VALUES" + " (" + id + ", '" + rut + "', '" + business_name + "', '" + fantasy_name + "', " + activity_id + ", " + country_id + ", " + region_id + ", " + city_id + ", " + commune_id + ", '" + address + "', '" + email + "', '" + email_dte + "', '" + website + "', " + is_customer + ", " + is_supplier + ", " + is_active + ", '" + phone + "', '" + phone_two + "', " + payment_type + ", " + seller_id + ", " + list_price_id + ", " + expired_days + ", " + limit_amount + ", " + is_customer_simple + ", " + can_invoice + ", " + can_ballot + ", " + can_no_ballot + ", '" + datenow + "', '" + datenow + "')"
  const addcustomers = await query(customersAddQuery, mysql);
  return addcustomers;
}

const PutCustomers = async (bd_name, host, id_params, id, rut, business_name, fantasy_name, activity_id, country_id, region_id, city_id, commune_id, address, email, email_dte, website, is_customer, is_supplier, is_active, phone, phone_two, payment_type, seller_id, list_price_id, expired_days, limit_amount, is_customer_simple, can_invoice, can_ballot, can_no_ballot) => {
  var id, rut, business_name, fantasy_name, activity_id, country_id, region_id, city_id, commune_id, address, email, email_dte, website, is_customer, is_supplier, is_active, phone, phone_two, payment_type, seller_id, list_price_id, expired_days, limit_amount, is_customer_simple, can_invoice, can_ballot, can_no_ballot;
  var f_id,  f_rut,  f_fantasy_name,  f_business_name,  f_activity_id,  f_country_id,  f_region_id,  f_city_id,  f_commune_id,  f_address,  f_email,  f_email_dte,  f_website,  f_is_customer,  f_is_supplier,  f_is_active,  f_phone,  f_phone_two, f_payment_type,  f_seller_id,  f_list_price_id,  f_expired_days,  f_limit_amount,  f_is_customer_simple,  f_can_invoice,  f_can_ballot,  f_can_no_ballot;
  var f = new Date();
  f_id = ( !id || id == '' ) ?f_id = "" : f_id = "id = " + id + ", ";
  f_rut = ( !rut || rut == '' ) ?f_rut = "" : f_rut = "rut = '" + rut + "', ";
  f_business_name = ( !business_name || business_name == '' ) ?f_business_name = "" : f_business_name = "business_name = '" + business_name + "', ";
  f_fantasy_name = ( !fantasy_name || fantasy_name == '' ) ?f_fantasy_name = "" : f_fantasy_name = "fantasy_name = '" + fantasy_name + "', ";
  f_activity_id = ( !activity_id || activity_id == '' ) ?f_activity_id = "" : f_activity_id = "activity_id = " + activity_id + ", ";
  f_country_id = ( !country_id || country_id == '' ) ?f_country_id = "" : f_country_id = "country_id = " + country_id + ", ";
  f_region_id = ( !region_id || region_id == '' ) ?f_region_id = "" : f_region_id = "region_id = " + region_id + ", ";
  f_city_id = ( !city_id || city_id == '' ) ?f_city_id = "" : f_city_id = "city_id = " + city_id + ", ";
  f_commune_id = ( !commune_id || commune_id == '' ) ?f_commune_id = "" : f_commune_id = "commune_id = " + commune_id + ", ";
  f_address = ( !address || address == '' ) ?f_address = "" : f_address = "address = '" + address + "', ";
  f_email = ( !email || email == '' ) ?f_email = "" : f_email = "email = '" + email + "', ";
  f_email_dte = ( !email_dte || email_dte == '' ) ?f_email_dte = "" : f_email_dte = "email_dte = '" + email_dte + "', ";
  f_website = ( !website || website == '' ) ?f_website = "" : f_website = "website = '" + website + "', ";
  f_is_customer = ( !is_customer || is_customer == '' ) ?f_is_customer = "" : f_is_customer = "is_customer = " + is_customer + ", ";
  f_is_supplier = ( !is_supplier || is_supplier == '' ) ?f_is_supplier = "" : f_is_supplier = "is_supplier = " + is_supplier + ", ";
  f_is_active = ( !is_active || is_active == '' ) ?f_is_active = "" : f_is_active = "is_active = " + is_active + ", ";
  f_phone = ( !phone || phone == '' ) ?f_phone = "" : f_phone = "phone = '" + phone + "', ";
  f_phone_two = ( !phone_two || phone_two == '' ) ?f_phone_two = "" : f_phone_two = "phone_two = '" + phone_two + "', ";
  f_payment_type = ( !payment_type || payment_type == '' ) ?f_payment_type = "" : f_payment_type = "payment_type = " + payment_type + ", ";
  f_seller_id = ( !seller_id || seller_id == '' ) ?f_iseller_id= "" : f_seller_id = "seller_id = " + seller_id + ", ";
  f_list_price_id = ( !list_price_id || list_price_id == '' ) ?f_list_price_id = "" : f_list_price_id = "list_price_id = " + list_price_id + ", ";
  f_expired_days = ( !expired_days || expired_days == '' ) ?f_expired_days = "" : f_expired_days = "expired_days = " + expired_days + ", ";
  f_limit_amount = ( !limit_amount || limit_amount == '' ) ?f_limit_amount = "" : f_limit_amount = "limit_amount = " + limit_amount + ", ";
  f_is_customer_simple = ( !is_customer_simple || is_customer_simple == '' ) ?f_is_customer_simple = "" : f_is_customer_simple = "is_customer_simple = " + is_customer_simple + ", ";
  f_can_invoice = ( !can_invoice || can_invoice == '' ) ?f_can_invoice = "" : f_can_invoice = "can_invoice = " + can_invoice + ", ";
  f_can_ballot = ( !can_ballot || can_ballot == '' ) ?f_can_ballot = "" : f_can_ballot = "can_ballot = " + can_ballot + ", ";
  f_can_no_ballot = ( !can_no_ballot || can_no_ballot == '' ) ?f_can_no_ballot = "" : f_can_no_ballot = "can_no_ballot = " + can_no_ballot + ", ";
  var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
  const mysql = createConnectMysql(host, bd_name)
  const customersPutQuery = "UPDATE `customer_suppliers` SET " + f_id + f_rut + f_business_name + f_fantasy_name + f_activity_id + f_country_id + f_region_id + f_city_id + f_commune_id + f_address + f_email + f_email_dte + f_website + f_is_customer + f_is_supplier + f_is_active + f_phone + f_phone_two + f_payment_type + f_seller_id + f_list_price_id + f_expired_days + f_limit_amount + f_is_customer_simple + f_can_invoice + f_can_ballot + f_can_no_ballot + "updated_at = '" + datenow + "' WHERE id = " + id_params
  const putcustomers = await query(customersPutQuery, mysql);
  console.log(customersPutQuery);
  return putcustomers;
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
  getCustomers,
  AddCustomers,
  PutCustomers
}