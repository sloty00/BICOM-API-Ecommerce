/*
-------------------------------------TABLA BASE--------------------------------------
*/
const { getSellers, getAddSellers } = require('../repositories/sellers')

const getAllSellers = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const sellers = await getSellers(bd_name, host, req.query.page);
  res.json(sellers)
};

const AddSellers = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addsellers = await getAddSellers(bd_name, host, req.body.id, req.body.description, req.body.user_id);
  res.json(addsellers)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllSellers,
  AddSellers
}