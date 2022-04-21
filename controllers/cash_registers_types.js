/*
-------------------------------------TABLA COMPUESTA (E/R)--------------------------------------
-branchoffice
-posmachine
-warehouse
-cost center
-printer
-transbank_machine
*/
//Declaracion de Constantes.
const { getCRT, getAddCRT } = require('../repositories/cash_registers_types')

const getAllCRT = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const crt = await getCRT(bd_name, host, req.query.page);
  res.json(crt)
};

const AddCRT = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const CRT = await getAddCRT(bd_name, host, req.body.id, req.body.branchoffice_id, req.body.description, req.body.posmachine_id, req.body.warehouse_id, req.body.cost_center_id, req.body.printer_id, req.body.transbank_machine_id, req.body.state);
  res.json(CRT)
}


//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllCRT,
  AddCRT
}