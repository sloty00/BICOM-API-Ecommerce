/*
-------------------------------------TABLA COMPUESTA (E/R por CITIES)--------------------------------------
*/
//Declaracion de Constantes.
const { getProductsStock } = require('../repositories/md_products_stock')

const getAllProductsStock = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const productsStock = await getProductsStock(bd_name, host, req.query.page);
  //console.log(communes)
  res.json(productsStock)
};

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllProductsStock
}