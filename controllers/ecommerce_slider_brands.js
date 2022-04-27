/*
-------------------------------------TABLA SIMPLE--------------------------------------
*/
//Declaracion de Constantes.
const { getEcommerceBrands, AddEcommerceBrands, PutEcommerceBrands } = require('../repositories/ecommerce_slider_brands')

const getAllEcommerceBrands = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const ebrands = await getEcommerceBrands(bd_name, host, req.query.page);
  res.json(ebrands)
};

const Add_EcommerceBrands = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addecommercebrands = await AddEcommerceBrands(bd_name, host, req.body.id, req.body.slider_img);
  res.json(addecommercebrands)
}

const Put_EcommerceBrands = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  var id = (req.body.id == undefined) ?"":req.body.id;
  var slider_img = (req.body.slider_img == undefined) ?"":req.body.slider_img;

  const putecommercebrands = await PutEcommerceBrands(bd_name, host, req.params.id_params, id, slider_img);
  res.json(putecommercebrands)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllEcommerceBrands,
  Add_EcommerceBrands,
  Put_EcommerceBrands
}