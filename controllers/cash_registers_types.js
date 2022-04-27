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
const { getCRT, AddCRT, PutCRT } = require('../repositories/cash_registers_types')

const getAllCRT = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const crt = await getCRT(bd_name, host, req.query.page);
  res.json(crt)
};

const Add_CRT = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const CRT = await AddCRT(bd_name, host, req.body.id, req.body.branchoffice_id, req.body.description, req.body.posmachine_id, req.body.warehouse_id, req.body.cost_center_id, req.body.printer_id, req.body.transbank_machine_id, req.body.state);
  res.json(CRT)
}

const Put_CRT = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  
  var id = (req.body.id == undefined) ?"":req.body.id;
  var branchoffice_id = (req.body.branchoffice_id == undefined) ?"":req.body.branchoffice_id;
  var description = (req.body.description == undefined) ?"":req.body.description;
  var posmachine_id = (req.body.posmachine_id == undefined) ?"":req.body.posmachine_id;
  var warehouse_id = (req.body.warehouse_id == undefined) ?"":req.body.warehouse_id;
  var cost_center_id = (req.body.cost_center_id == undefined) ?"":req.body.cost_center_id;
  var printer_id = (req.body.printer_id == undefined) ?"":req.body.printer_id;
  var transbank_machine_id = (req.body.transbank_machine_id == undefined) ?"":req.body.transbank_machine_id;
  var state = (req.body.state == undefined) ?"":req.body.state;
  
  
  const putcrt = await PutCRT(bd_name, host, req.params.id_params, id, branchoffice_id, description, posmachine_id, warehouse_id, cost_center_id, printer_id, transbank_machine_id, state);
  res.json(putcrt)
}


//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllCRT,
  Add_CRT,
  Put_CRT
}