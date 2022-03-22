/*
-------------------------------------------TABLA BASE-------------------------------------------------
*/
//Declaracion de Constantes.
const { getBanks } = require('../repositories/banks')

const getAllBanks = async (req, res) => {
  const bd_name = 'bicom2'
  const host = "1"

  const banks = await getBanks(bd_name, host, req.query.page);
  //console.log(banks)
  res.json(banks)
};

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllBanks
}