/*
-------------------------------------TABLA COMPUESTA (E/R por CITIES)--------------------------------------
*/
//Declaracion de Constantes.
const { getCommunes, AddCommunes, PutCommunes } = require('../repositories/communes')

const getAllCommunes = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const communes = await getCommunes(bd_name, host, req.query.page);
  res.json(communes)
};

const Add_Communes = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const communes = await getAddCommunes(bd_name, host, req.body.id, req.body.code, req.body.description, req.body.city_id);
  res.json(communes)
}

const Put_Communes = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  var id = (req.body.id == undefined) ?"":req.body.id;
  var code = (req.body.code == undefined) ?"":req.body.code;
  var description = (req.body.description == undefined) ?"":req.body.description;
  var city_id = (req.body.city_id == undefined) ?"":req.body.city_id;
  
  const putcommunes = await getPutCommunes(bd_name, host, req.params.id_params, id, code, description, city_id);
  res.json(putcommunes)
}


//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllCommunes,
  Add_Communes,
  Put_Communes
}