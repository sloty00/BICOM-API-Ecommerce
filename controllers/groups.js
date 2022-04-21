/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { getGroups, getAddGroups } = require('../repositories/groups')

const getAllGroups = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const groups = await getGroups(bd_name, host, req.query.page);
  res.json(groups)
};

const Addgroups = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addgroups = await getAddGroups(bd_name, host, req.body.id, req.body.description, req.body.is_ecommerce, req.body.is_menu, req.body.img_groups);
  res.json(addgroups)
}

//Exportamos la funcion para usar los datos en .router/groups.js
module.exports = {
  getAllGroups,
  Addgroups
}