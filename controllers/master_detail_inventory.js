//Declaracion de Constantes.
const { getMdInventory } = require('../repositories/master_detail_inventory')

const getAllMdInventory = async (req, res) => {
  const bd_name = 'bicom2'
  const host = "1"

  const mdinventory = await getMdInventory(bd_name, host, req.query.page);
  //console.log(mdinventarios)
  res.json(mdinventory)
};

//Exportamos la funcion para usar los datos en .router/groups.js
module.exports = {
    getAllMdInventory
}