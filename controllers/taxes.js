/*
-------------------------------------TABLA BASE--------------------------------------
*/
const { getTaxes, getAddTaxes } = require('../repositories/taxes')

const getAllTaxes = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const taxes = await getTaxes(bd_name, host, req.query.page);
  res.json(taxes)
};

const AddTaxes = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addtaxes = await getAddTaxes(bd_name, host, req.body.id, req.body.code, req.body.description, req.body.value, req.body.type);
  res.json(addtaxes)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllTaxes,
  AddTaxes
}