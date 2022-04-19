/*
-------------------------------------TABLA SIMPLE--------------------------------------
*/
//Declaracion de Constantes.
const { getEcommerceBrands } = require('../repositories/ecommerce_slider_brands')

const getAllEcommerceBrands = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const ebrands = await getEcommerceBrands(bd_name, host, req.query.page);
  res.json(ebrands)
};

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllEcommerceBrands
}