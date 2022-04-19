/*
-------------------------------------TABLA BASE--------------------------------------
*/
const { getTaxes } = require('../repositories/taxes')

const getAllTaxes = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const taxes = await getTaxes(bd_name, host, req.query.page);
  res.json(taxes)
};

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllTaxes
}