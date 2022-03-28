//Declaracion de Constantes.
const { getMdProduct } = require('../repositories/md_product')

const getAllMdProduct = async (req, res) => {
  const bd_name = 'bicom2'
  const host = "1"

  const mdproduct = await getMdProduct(bd_name, host, req.query.page);
  //console.log(mdinventarios)
  res.json(mdproduct)
};

//Exportamos la funcion para usar los datos en .router/groups.js
module.exports = {
    getAllMdProduct
}