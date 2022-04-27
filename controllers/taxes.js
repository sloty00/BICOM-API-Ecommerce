/*
-------------------------------------TABLA BASE--------------------------------------
*/
const { getTaxes, AddTaxes, PutTaxes } = require('../repositories/taxes')

const getAllTaxes = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const taxes = await getTaxes(bd_name, host, req.query.page);
  res.json(taxes)
};

const Add_Taxes = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addtaxes = await AddTaxes(bd_name, host, req.body.id, req.body.code, req.body.description, req.body.value, req.body.type);
  res.json(addtaxes)
}

const Put_Taxes = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  var id = (req.body.id == undefined) ?"":req.body.id;
  var code = (req.body.code == undefined) ?"":req.body.code;
  var description= (req.body.description == undefined) ?"":req.body.description;
  var value = (req.body.value == undefined) ?"":req.body.value;
  var type = (req.body.type == undefined) ?"":req.body.type;

  const puttaxes = await PutTaxes(bd_name, host, req.params.id_params, id, code, description, value, type);
  res.json(puttaxes)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllTaxes,
  Add_Taxes,
  Put_Taxes
}