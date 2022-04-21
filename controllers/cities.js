/*
-------------------------------------TABLA COMPUESTA (E/R por REGIONS)--------------------------------------
*/
//Declaracion de Constantes.
const { getCities, getAddCities } = require('../repositories/cities')

const getAllCities = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const cities = await getCities(bd_name, host, req.query.page);
  res.json(cities)
};


const AddCities = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const cities = await getAddCities(bd_name, host, req.body.id, req.body.code, req.body.description, req.body.region_id);
  res.json(cities)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllCities,
  AddCities
}