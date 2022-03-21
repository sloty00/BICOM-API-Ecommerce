/*
-------------------------------------TABLA COMPUESTA (E/R por COUNTRIES)--------------------------------------
*/
const { getRegions } = require('../repositories/regions')

const getAllRegions = async (req, res) => {
  const bd_name = 'bicom2'
  const host = "1"

  const regions = await getRegions(bd_name, host, req.query.page);
  //console.log(products)
  res.json(regions)
};

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllRegions
}