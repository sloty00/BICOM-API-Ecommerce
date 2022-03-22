/*
-------------------------------------TABLA BASE--------------------------------------
*/
const { getSellers } = require('../repositories/sellers')

const getAllSellers = async (req, res) => {
  const bd_name = 'bicom2'
  const host = "1"

  const sellers = await getSellers(bd_name, host, req.query.page);
  //console.log(sellers)
  res.json(sellers)
};

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllSellers
}