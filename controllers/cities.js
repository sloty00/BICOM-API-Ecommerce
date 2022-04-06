/*
-------------------------------------TABLA COMPUESTA (E/R por REGIONS)--------------------------------------
*/
//Declaracion de Constantes.
const { getCities } = require('../repositories/cities')

const getAllCities = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const cities = await getCities(bd_name, host, req.query.page);
  //console.log(cities)
  res.json(cities)
};

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllCities
}