/*
--------------------------------------------TABLA BASE----------------------------------------------
*/
//Declaracion de Constantes.
const { getSubGroups, AddSubgroups, PutSubGroups } = require('../repositories/subgroups')

const getAllSubgroups = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const subgroups = await getSubGroups(bd_name, host, req.query.page);
  res.json(subgroups)
};

const Add_Subgroups = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addsubgroups = await AddSubgroups(bd_name, host, req.body.id, req.body.description, req.body.group_id);
  res.json(addsubgroups)
}

const Put_Subgroups = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  var id = (req.body.id == undefined) ?"":req.body.id;
  var description= (req.body.description == undefined) ?"":req.body.description;
  var group_id = (req.body.group_id == undefined) ?"":req.body.group_id;

  const putsubgroups = await PutSubGroups(bd_name, host, req.params.id_params, id, description, group_id);
  res.json(putsubgroups)
}


//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllSubgroups,
  Add_Subgroups,
  Put_Subgroups
}