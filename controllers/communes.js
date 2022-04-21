/*
-------------------------------------TABLA COMPUESTA (E/R por CITIES)--------------------------------------
*/
//Declaracion de Constantes.
const { getCommunes, getAddCommunes } = require('../repositories/communes')

const getAllCommunes = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const communes = await getCommunes(bd_name, host, req.query.page);
  res.json(communes)
};

const AddCommunes = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const communes = await getAddCommunes(bd_name, host, req.body.id, req.body.code, req.body.description, req.body.city_id);
  res.json(communes)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllCommunes,
  AddCommunes
}