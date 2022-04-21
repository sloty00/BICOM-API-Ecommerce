/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { header } = require('express/lib/request');
const { getActivities, getAddActivities } = require('../repositories/activities')

const getAllActivities = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const activitie = await getActivities(bd_name, host, req.query.page);
  res.json(activitie)
};

const AddActivities = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addactivities = await getAddActivities(bd_name, host, req.body.id, req.body.code, req.body.description);
  res.json(addactivities)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllActivities,
  AddActivities
}