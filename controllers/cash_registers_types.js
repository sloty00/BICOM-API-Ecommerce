/*
-------------------------------------TABLA COMPUESTA (E/R)--------------------------------------
*/
//Declaracion de Constantes.
const { getCRT } = require('../repositories/cash_registers_types')

const getAllCRT = async (req, res) => {
  const bd_name = 'bicom2'
  const host = "1"

  const crt = await getCRT(bd_name, host, req.query.page);
  //console.log(crt)
  res.json(crt)
};

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllCRT
}