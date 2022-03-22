//Declaracion de Constantes.
const { getMuis } = require('../repositories/muis')
//const { addMuis } = require('../repositories/muis')

const getAllMuis = async (req, res) => {
  const bd_name = 'bicom2'
  const host = "1"

  const muis = await getMuis(bd_name, host, req.query.page);
  //console.log(muis)
  res.json(muis)
};


//Exportamos la funcion para usar los datos en .router/muis.js
module.exports = {
  getAllMuis,
}