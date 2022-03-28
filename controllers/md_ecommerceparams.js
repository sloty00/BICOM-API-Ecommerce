//Declaracion de Constantes.
const { getMdEcommP } = require('../repositories/md_ecommerceparams')

const getAllEcommp = async (req, res) => {
  const bd_name = 'bicom2'
  const host = "1"

  const ecommps = await getMdEcommP(bd_name, host, req.query.page);
  //console.log(groups)
  res.json(ecommps)
};

//Exportamos la funcion para usar los datos en .router/groups.js
module.exports = {
  getAllEcommp
}