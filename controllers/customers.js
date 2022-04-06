/*
-------------------------------------TABLA COMPUESTA (E/R)--------------------------------------
*/
//Declaracion de Constantes.
const { getCustomers } = require('../repositories/customers')

const getAllCustomers = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  var is_active = (req.query.is_active == undefined) ?"":req.query.is_active;
  var is_customers = (req.query.is_customers == undefined) ?"":req.query.is_customers;
  var is_suppliers = (req.query.is_suppliers == undefined) ?"":req.query.is_suppliers;
  var region_id = (req.query.region_id == undefined) ?"":req.query.region_id;
  var city_id = (req.query.city_id == undefined) ?"":req.query.city_id;
  var communes_id = (req.query.communes_id == undefined) ?"":req.query.communes_id;
  var activity_id = (req.query.activity_id == undefined) ?"":req.query.activity_id;

  const customers = await getCustomers(bd_name, host, req.query.page, is_active, is_customers, is_suppliers, region_id, city_id, communes_id, activity_id);
  res.json(customers)
};

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllCustomers
}