/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { getActivities } = require('../repositories/activities')

const getAllActivities = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const activities = await getActivities(bd_name, host, req.query.page);
  //console.log(acttivities)
  res.json(activities)
};

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllActivities
}