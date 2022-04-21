/*
-------------------------------------------TABLA BASE-------------------------------------------------
*/
//Declaracion de Constantes.
const { getBanks, getAddBanks } = require('../repositories/banks')

const getAllBanks = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const banks = await getBanks(bd_name, host, req.query.page);
  console.log(req.query.page)
  res.json(banks)
};

const AddBanks = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const banks = await getAddBanks(bd_name, host, req.body.id, req.body.code, req.body.description);
  res.json(banks)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllBanks,
  AddBanks
}