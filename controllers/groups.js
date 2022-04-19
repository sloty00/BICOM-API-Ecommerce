/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { getGroups } = require('../repositories/groups')

const getAllGroups = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const groups = await getGroups(bd_name, host, req.query.page);
  res.json(groups)
};

//Exportamos la funcion para usar los datos en .router/groups.js
module.exports = {
  getAllGroups
}