/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { getCountries } = require('../repositories/countries')

const getAllCountries = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const countries = await getCountries(bd_name, host, req.query.page);
  //console.log(countries)
  res.json(countries)
};

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllCountries
}