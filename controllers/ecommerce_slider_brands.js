/*
-------------------------------------TABLA SIMPLE--------------------------------------
*/
//Declaracion de Constantes.
const { getEcommerceBrands, getAddEcommerceBrands } = require('../repositories/ecommerce_slider_brands')

const getAllEcommerceBrands = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const ebrands = await getEcommerceBrands(bd_name, host, req.query.page);
  res.json(ebrands)
};

const AddEcommerceBrands = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addecommercebrands = await getAddEcommerceBrands(bd_name, host, req.body.id, req.body.slider_img);
  res.json(addecommercebrands)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllEcommerceBrands,
  AddEcommerceBrands
}