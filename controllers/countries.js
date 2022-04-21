/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { getCountries, getAddCountries } = require('../repositories/countries')

const getAllCountries = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addcountries = await getCountries(bd_name, host, req.query.page);
  res.json(addcountries)
};

const AddCountries = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addcountries = await getAddCountries(bd_name, host, req.body.id, req.body.code, req.body.description);
  res.json(addcountries)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllCountries,
  AddCountries
}