/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { getPosMachines, AddPosmachines, PutPosmachines } = require('../repositories/posmachines')

const getAllPosMachines = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const pmachines = await getPosMachines(bd_name, host, req.query.page);
    res.json(pmachines)
};

const Add_Posmachines = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addposmachines = await AddPosmachines(bd_name, host, req.body.id, req.body.code, req.body.description, req.body.mac_address);
  res.json(addposmachines)
}

const Put_Posmachines = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  var id = (req.body.id == undefined) ?"":req.body.id;
  var code = (req.body.code == undefined) ?"":req.body.code;
  var description = (req.body.description == undefined) ?"":req.body.description;
  var mac_address = (req.body.mac_address == undefined) ?"":req.body.mac_address;

  const putprinters = await PutPosmachines(bd_name, host, req.params.id_params, id, code, description, mac_address);
  res.json(putprinters)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllPosMachines,
  Add_Posmachines,
  Put_Posmachines
}