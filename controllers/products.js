/*
-------------------------------------TABLA COMPUESTA (E/R)--------------------------------------
-measurement_unit
-group
-subgroup
-measurement_unit_convert_id???
*/
//Declaracion de Constantes.
const { getAllProducts, AddProducts, PutProducts } = require('../repositories/products')

const GetAllProducts = async (req, res) => {//Funcion de tipo asincronica, declara parametros
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  var code = (req.query.code == undefined) ?"":req.query.code;
  var begin_code = (req.query.begin_code == undefined) ?"":req.query.begin_code;
  var end_code = (req.query.end_code == undefined) ?"":req.query.end_code;
  var is_active = (req.query.is_active == undefined) ?"":req.query.is_active;
  var is_inventory = (req.query.is_inventory == undefined) ?"":req.query.is_inventory;
  var is_ecommerce = (req.query.is_ecommerce == undefined) ?"":req.query.is_ecommerce;
  var is_ticket = (req.query.is_ticket == undefined) ?"":req.query.is_ticket;
  var is_aggregate = (req.query.is_aggregate == undefined) ?"":req.query.is_aggregate;
  var is_free = (req.query.is_free == undefined) ?"":req.query.is_free;
  var is_kit = (req.query.is_kit == undefined) ?"":req.query.is_kit;
  var group_id = (req.query.group_id == undefined) ?"":req.query.group_id;
  var sub_group_id = (req.query.sub_group_id == undefined) ?"":req.query.sub_group_id;
  var custom1 = (req.query.custom1 == undefined) ?"":req.query.custom1;
  var custom2 = (req.query.custom2 == undefined) ?"":req.query.custom2;
  var custom3 = (req.query.custom3 == undefined) ?"":req.query.custom3;
  var custom4 = (req.query.custom4 == undefined) ?"":req.query.custom4;
  var custom5 = (req.query.custom5 == undefined) ?"":req.query.custom5;

  const products = await getAllProducts(bd_name, host, req.query.page, code, begin_code, end_code, is_active, is_inventory, is_ecommerce, is_ticket, is_aggregate, is_free, is_kit, group_id, sub_group_id, custom1, custom2, custom3, custom4, custom5);
  res.json(products)
};

const Add_Products = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addproducts = await AddProducts(bd_name, host, req.body.id, req.body.code, req.body.barcode, req.body.barcode_type, req.body.description, req.body.description_details, req.body.measurement_unit_id, req.body.group_id, req.body.sub_group_id, req.body.price_net, req.body.price_brute, req.body.is_inventory, req.body.is_visiblePOS, req.body.is_active, req.body.img_one, req.body.price_lastpur, req.body.stockmax, req.body.stockrep, req.body.stockmin, req.body.measurement_unit_convert_id, req.body.custom1, req.body.custom2, req.body.custom3, req.body.custom4, req.body.custom5, req.body.cost_prom, req.body.weight, req.body.is_kit, req.body.is_ticket, req.body.is_aggregate, req.body.is_ecommerce, req.body.print_details, req.body.price_net_uf, req.body.is_free);
  res.json(addproducts)
}

const Put_Products = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const putproducts = await PutProducts(bd_name, host, req.params.id_params, req.body.id, req.body.code, req.body.barcode, req.body.barcode_type, req.body.description, req.body.description_details, req.body.measurement_unit_id, req.body.group_id, req.body.sub_group_id, req.body.price_net, req.body.price_brute, req.body.is_inventory, req.body.is_visiblePOS, req.body.is_active, req.body.img_one, req.body.price_lastpur, req.body.stockmax, req.body.stockrep, req.body.stockmin, req.body.measurement_unit_convert_id, req.body.custom1, req.body.custom2, req.body.custom3, req.body.custom4, req.body.custom5, req.body.cost_prom, req.body.weight, req.body.is_kit, req.body.is_ticket, req.body.is_aggregate, req.body.is_ecommerce, req.body.print_details, req.body.price_net_uf, req.body.is_free);
  res.json(putproducts)
}

//Exportamos la funcion para usar los datos en .router/products.js
module.exports = {
  GetAllProducts,
  Add_Products,
  Put_Products
}