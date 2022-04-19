/*
-------------------------------------TABLA COMPUESTA (E/R por CITIES)--------------------------------------
*/
//Declaracion de Constantes.
const { getCommunes } = require('../repositories/communes')

const getAllCommunes = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const communes = await getCommunes(bd_name, host, req.query.page);
  res.json(communes)
};

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllCommunes
}