/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { getPosMachines, getAddPosmachines } = require('../repositories/posmachines')

const getAllPosMachines = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const pmachines = await getPosMachines(bd_name, host, req.query.page);
    res.json(pmachines)
};

const AddPosmachines = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addposmachines = await getAddPosmachines(bd_name, host, req.body.id, req.body.code, req.body.description, req.body.mac_address);
  res.json(addposmachines)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllPosMachines,
  AddPosmachines
}