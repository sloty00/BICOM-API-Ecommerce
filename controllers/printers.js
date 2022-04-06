/*
-------------------------------------TABLA COMPUESTA (E/R por BRANCH_OFFICE)--------------------------------------
*/
//Declaracion de Constantes.
const { getPrinters } = require('../repositories/printers')

const getAllPrinters = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const printers = await getPrinters(bd_name, host, req.query.page);
  //console.log(printers)
  res.json(printers)
};

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllPrinters
}