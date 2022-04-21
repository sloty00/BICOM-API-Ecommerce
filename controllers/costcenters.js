/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { getCostCenters, getAddCostCenters } = require('../repositories/costcenters')

const getAllCostCenters = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const ccenters = await getCostCenters(bd_name, host, req.query.page);
  res.json(ccenters)
};

const AddCostCenters = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const add = await getAddCostCenters(bd_name, host, req.body.id, req.body.code, req.body.description);
  res.json(add)
}


//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllCostCenters,
  AddCostCenters
}