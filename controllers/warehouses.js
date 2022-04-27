/*
-------------------------------------------TABLA BASE-------------------------------------------------
*/
//Declaracion de Constantes.
const { getWarehouses, AddWarehouses, PutWarehouses } = require('../repositories/warehouses')

const getAllWarehouses = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const warehouses = await getWarehouses(bd_name, host, req.query.page);
  res.json(warehouses)
};

const Add_Warehouses = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addwarehouses = await AddWarehouses(bd_name, host, req.body.id, req.body.code, req.body.description, req.body.address, req.body.is_ecommerce);
  res.json(addwarehouses)
}

const Put_Warehouses = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  var id = (req.body.id == undefined) ?"":req.body.id;
  var code = (req.body.code == undefined) ?"":req.body.code;
  var description= (req.body.description == undefined) ?"":req.body.description;
  var address = (req.body.address == undefined) ?"":req.body.address;
  var is_ecommerce = (req.body.is_ecommerce == undefined) ?"":req.body.is_ecommerce;

  const putwarehouses = await PutWarehouses(bd_name, host, req.params.id_params, id, code, description, address, is_ecommerce);
  res.json(putwarehouses)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllWarehouses,
  Add_Warehouses,
  Put_Warehouses
}