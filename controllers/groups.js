//Declaracion de Constantes.
const { getGroups } = require('../repositories/groups')

const getAllGroups = async (req, res) => {
  const bd_name = 'bicom2'
  const host = "1"

  const groups = await getGroups(bd_name, host, req.query.page);
  //console.log(groups)
  res.json(groups)
};

//Exportamos la funcion para usar los datos en .router/groups.js
module.exports = {
  getAllGroups
}