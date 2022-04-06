//Declaracion de Constantes.
const { getMdProduct } = require('../repositories/md_products_ecommerces')

const getAllMdProduct = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  var is_active = (req.query.is_active == undefined) ?"":req.query.is_active;
  var is_inventory = (req.query.is_inventory == undefined) ?"":req.query.is_inventory;
  var is_ecommerce = (req.query.is_ecommerce == undefined) ?"":req.query.is_ecommerce;
  var is_ticket = (req.query.is_ticket == undefined) ?"":req.query.is_ticket;
  var is_aggregate = (req.query.is_aggregate == undefined) ?"":req.query.is_aggregate;
  var is_free = (req.query.is_free == undefined) ?"":req.query.is_free;
  var is_kit = (req.query.is_kit == undefined) ?"":req.query.is_kit;
  var group_id = (req.query.group_id == undefined) ?"":req.query.group_id;
  var subgroup_id = (req.query.subgroup_id == undefined) ?"":req.query.subgroup_id;
  var custom1 = (req.query.custom1 == undefined) ?"":req.query.custom1;
  var custom2 = (req.query.custom2 == undefined) ?"":req.query.custom2;
  var custom3 = (req.query.custom3 == undefined) ?"":req.query.custom3;
  var custom4 = (req.query.custom4 == undefined) ?"":req.query.custom4;
  var custom5 = (req.query.custom5 == undefined) ?"":req.query.custom5;

  const mdproduct = await getMdProduct(bd_name, host, req.query.page, is_active, is_inventory, is_ecommerce, is_ticket, is_aggregate, is_free, is_kit, group_id, subgroup_id, custom1, custom2, custom3, custom4, custom5);
  //console.log(mdinventarios)
  res.json(mdproduct)
};

//Exportamos la funcion para usar los datos en .router/groups.js
module.exports = {
    getAllMdProduct
}