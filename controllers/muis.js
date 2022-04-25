/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { getMuis, getAddMunits } = require('../repositories/muis')

const getAllMuis = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const muis = await getMuis(bd_name, host, req.query.page);
  res.json(muis)
};

const Addmuis = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addmuis = await getAddMunits(bd_name, host, req.body.id, req.body.code, req.body.description);
  res.json(addmuis)
}


//Exportamos la funcion para usar los datos en .router/muis.js
module.exports = {
  getAllMuis,
  Addmuis
}