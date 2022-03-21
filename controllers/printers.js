/*
-------------------------------------TABLA COMPUESTA (E/R por BRANCH_OFFICE)--------------------------------------
*/
//Declaracion de Constantes.
const { getPrinters } = require('../repositories/printers')

const getAllPrinters = async (req, res) => {
  const bd_name = 'bicom2'
  const host = "1"

  const printers = await getPrinters(bd_name, host, req.query.page);
  //console.log(products)
  res.json(printers)
};

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllPrinters
}