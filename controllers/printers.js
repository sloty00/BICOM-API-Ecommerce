/*
-------------------------------------TABLA COMPUESTA (E/R por BRANCH_OFFICE)--------------------------------------
*/
//Declaracion de Constantes.
const { getPrinters, AddPrinters, PutPrinters } = require('../repositories/printers')

const getAllPrinters = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const printers = await getPrinters(bd_name, host, req.query.page);
  res.json(printers)
};

const Add_Printers = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addprinters = await AddPrinters(bd_name, host, req.body.id, req.body.description, req.body.is_active, req.body.branchoffice_id);
  res.json(addprinters)
}

const Put_Printers = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  var id = (req.body.id == undefined) ?"":req.body.id;
  var description = (req.body.description == undefined) ?"":req.body.description;
  var is_active = (req.body.is_active == undefined) ?"":req.body.is_active;
  var branchoffice_id = (req.body.branchoffice_id == undefined) ?"":req.body.branchoffice_id;

  const putprinters = await PutPrinters(bd_name, host, req.params.id_params, id, description, is_active, branchoffice_id);
  res.json(putprinters)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllPrinters,
  Add_Printers,
  Put_Printers
}