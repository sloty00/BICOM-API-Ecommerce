/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { getActivities } = require('../repositories/activities')

const getAllActivities = async (req, res) => {
  const bd_name = 'bicom2'
  const host = "1"

  const activities = await getActivities(bd_name, host, req.query.page);
  //console.log(products)
  res.json(activities)
};

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllActivities
}