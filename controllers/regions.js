/*
-------------------------------------TABLA COMPUESTA (E/R por COUNTRIES)--------------------------------------
*/
const { getRegions, getAddRegions } = require('../repositories/regions')

const getAllRegions = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const regions = await getRegions(bd_name, host, req.query.page);
  res.json(regions)
};

const AddRegions = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addregions = await getAddRegions(bd_name, host, req.body.id, req.body.code, req.body.description, req.body.country_id);
  res.json(addregions)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllRegions,
  AddRegions
}