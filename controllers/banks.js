/*
-------------------------------------------TABLA BASE-------------------------------------------------
*/
//Declaracion de Constantes.
const { getBanks, getAddBanks, getPutBanks } = require('../repositories/banks')

const getAllBanks = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const banks = await getBanks(bd_name, host, req.query.page);
  console.log(req.query.page)
  res.json(banks)
};

const Add_Banks = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const banks = await AddBanks(bd_name, host, req.body.id, req.body.code, req.body.description);
  res.json(banks)
}

const Put_Banks = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  var id = (req.body.id == undefined) ?"":req.body.id;
  var code = (req.body.code == undefined) ?"":req.body.code;
  var description = (req.body.description == undefined) ?"":req.body.description;
  
  const putbanks = await PutBanks(bd_name, host, req.params.id_params, id, code, description);
  res.json(putbanks)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllBanks,
  Add_Banks,
  Put_Banks
}