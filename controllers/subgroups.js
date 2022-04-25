/*
--------------------------------------------TABLA BASE----------------------------------------------
*/
//Declaracion de Constantes.
const { getSubGroups, getAddSubgroups } = require('../repositories/subgroups')

const getAllSubgroups = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const subgroups = await getSubGroups(bd_name, host, req.query.page);
  res.json(subgroups)
};

const AddSubgroups = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addsubgroups = await getAddSubgroups(bd_name, host, req.body.id, req.body.description, req.body.group_id);
  res.json(addsubgroups)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllSubgroups,
  AddSubgroups
}