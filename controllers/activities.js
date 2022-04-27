/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { header } = require('express/lib/request');
const { getActivities, AddActivities, PutActivities } = require('../repositories/activities')

const getAllActivities = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const activitie = await getActivities(bd_name, host, req.query.page);
  res.json(activitie)
};

const Add_Activities = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addactivities = await AddActivities(bd_name, host, req.body.id, req.body.code, req.body.description);
  res.json(addactivities)
}

const Put_Activities = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  var id = (req.body.id == undefined) ?"":req.body.id;
  var code = (req.body.code == undefined) ?"":req.body.code;
  var description = (req.body.description == undefined) ?"":req.body.description;
  
  const putactivities = await PutActivities(bd_name, host, req.params.id_params, id, code, description);
  res.json(putactivities)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllActivities,
  Add_Activities,
  Put_Activities
}