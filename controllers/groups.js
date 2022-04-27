/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { getGroups, AddGroups, PutGroups } = require('../repositories/groups')

const getAllGroups = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const groups = await getGroups(bd_name, host, req.query.page);
  res.json(groups)
};

const Add_Groups = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addgroups = await AddGroups(bd_name, host, req.body.id, req.body.description, req.body.is_ecommerce, req.body.is_menu, req.body.img_groups);
  res.json(addgroups)
}

const Put_Groups = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  var id = (req.body.id == undefined) ?"":req.body.id;
  var description = (req.body.description == undefined) ?"":req.body.description;
  var is_ecommerce = (req.body.is_ecommerce == undefined) ?"":req.body.is_ecommerce;
  var is_menu = (req.body.is_menu == undefined) ?"":req.body.is_menu;
  var img_groups = (req.body.img_groups == undefined) ?"":req.body.img_groups;

  const putgroups = await PutGroups(bd_name, host, req.params.id_params, id, description, is_ecommerce, is_menu, img_groups);
  res.json(putgroups)
}

//Exportamos la funcion para usar los datos en .router/groups.js
module.exports = {
  getAllGroups,
  Add_Groups,
  Put_Groups
}