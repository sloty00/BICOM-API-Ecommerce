//Declaracion de Constantes.
const { getProducts } = require('../repositories/products')

const getAllProducts = async (req, res) => {//Funcion de tipo asincronica, declara parametros
  const bd_name = 'bicom2'
  const host = "1"

  const products = await getProducts(bd_name, host, req.query.page);
  //console.log(products)
  res.json(products)
};

//Exportamos la funcion para usar los datos en .router/products.js
module.exports = {
  getAllProducts
}