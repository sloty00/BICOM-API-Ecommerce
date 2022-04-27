/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { getCostCenters, AddCostCenters, PutCostCenters } = require('../repositories/costcenters')

const getAllCostCenters = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const ccenters = await getCostCenters(bd_name, host, req.query.page);
  res.json(ccenters)
};

const Add_CostCenters = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const add = await AddCostCenters(bd_name, host, req.body.id, req.body.code, req.body.description);
  res.json(add)
}

const Put_CostCenters = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  var id = (req.body.id == undefined) ?"":req.body.id;
  var code = (req.body.code == undefined) ?"":req.body.code;
  var description = (req.body.description == undefined) ?"":req.body.description;

  const putcostcenters = await PutCostCenters(bd_name, host, req.params.id_params, id, code, description);
  res.json(putcostcenters)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllCostCenters,
  Add_CostCenters,
  Put_CostCenters
}