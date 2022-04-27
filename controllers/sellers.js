/*
-------------------------------------TABLA BASE--------------------------------------
*/
const { getSellers, AddSellers, PutSellers } = require('../repositories/sellers')

const getAllSellers = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const sellers = await getSellers(bd_name, host, req.query.page);
  res.json(sellers)
};

const Add_Sellers = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addsellers = await AddSellers(bd_name, host, req.body.id, req.body.description, req.body.user_id);
  res.json(addsellers)
}

const Put_Sellers = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  var id = (req.body.id == undefined) ?"":req.body.id;
  var description= (req.body.description == undefined) ?"":req.body.description;
  var user_id = (req.body.user_id == undefined) ?"":req.body.user_id;

  const putsellers = await PutSellers(bd_name, host, req.params.id_params, id, description, user_id);
  res.json(putsellers)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllSellers,
  Add_Sellers,
  Put_Sellers
}