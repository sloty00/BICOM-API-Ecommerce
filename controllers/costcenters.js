/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { getCostCenters } = require('../repositories/costcenters')

const getAllCostCenters = async (req, res) => {
  const bd_name = 'bicom2'
  const host = "1"

  const ccenters = await getCostCenters(bd_name, host, req.query.page);
  //console.log(products)
  res.json(ccenters)
};

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllCostCenters
}