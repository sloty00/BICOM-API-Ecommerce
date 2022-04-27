/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { getCreditCards, AddCreditCards, PutCreditCards } = require('../repositories/creditcards')

const getAllCreditsCards = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const ccards = await getCreditCards(bd_name, host, req.query.page);
  res.json(ccards)
};

const Add_Credits = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addcredits = await AddCreditCards(bd_name, host, req.body.id, req.body.code, req.body.description);
  res.json(addcredits)
}

const Put_Credits = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  var id = (req.body.id == undefined) ?"":req.body.id;
  var code = (req.body.code == undefined) ?"":req.body.code;
  var description = (req.body.description == undefined) ?"":req.body.description;

  const putcredits = await PutCreditCards(bd_name, host, req.params.id_params, id, code, description);
  res.json(putcredits)
}


//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllCreditsCards,
  Add_Credits,
  Put_Credits
}