/*
-------------------------------------TABLA COMPUESTA (E/R)--------------------------------------
-activity
-country
-region
-city
-communes
-sellers
-list price
*/
//Declaracion de Constantes.
const { getCustomers } = require('../repositories/customers')

const getAllCustomers = async (req, res) => {
  const bd_name = 'bicom2'
  const host = "1"

  const customers = await getCustomers(bd_name, host, req.query.page);
  //console.log(customers)
  res.json(customers)
};

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllCustomers
}