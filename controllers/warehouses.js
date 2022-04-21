/*
-------------------------------------------TABLA BASE-------------------------------------------------
*/
//Declaracion de Constantes.
const { getWarehouses, getAddWarehouses } = require('../repositories/warehouses')

const getAllWarehouses = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const warehouses = await getWarehouses(bd_name, host, req.query.page);
  res.json(warehouses)
};

const AddWarehouses = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addwarehouses = await getAddWarehouses(bd_name, host, req.body.id, req.body.code, req.body.description, req.body.address, req.body.is_ecommerce);
  res.json(addwarehouses)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllWarehouses,
  AddWarehouses
}