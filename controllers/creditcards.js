/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { getCreditCards, getAddCreditCards } = require('../repositories/creditcards')

const getAllCreditsCards = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const ccards = await getCreditCards(bd_name, host, req.query.page);
  res.json(ccards)
};

const AddCreditsCards = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addcredits = await getAddCreditCards(bd_name, host, req.body.id, req.body.code, req.body.description);
  res.json(addcredits)
}


//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllCreditsCards,
  AddCreditsCards
}