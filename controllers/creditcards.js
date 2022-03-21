/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { getCreditCards } = require('../repositories/creditcards')

const getAllCreditsCards = async (req, res) => {
  const bd_name = 'bicom2'
  const host = "1"

  const ccards = await getCreditCards(bd_name, host, req.query.page);
  //console.log(products)
  res.json(ccards)
};

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllCreditsCards
}