/*
-------------------------------------TABLA COMPUESTA (E/R por BRANCH_OFFICE)--------------------------------------
*/
//Declaracion de Constantes.
const { getPrinters, getAddPrinters } = require('../repositories/printers')

const getAllPrinters = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const printers = await getPrinters(bd_name, host, req.query.page);
  res.json(printers)
};

const AddPrinters = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addprinters = await getAddPrinters(bd_name, host, req.body.id, req.body.description, req.body.is_active, req.body.branchoffice_id);
  res.json(addprinters)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllPrinters,
  AddPrinters
}