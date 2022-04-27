/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { getCountries, AddCountries, PutCountries } = require('../repositories/countries')

const getAllCountries = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addcountries = await getCountries(bd_name, host, req.query.page);
  res.json(addcountries)
};

const Add_Countries = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addcountries = await AddCountries(bd_name, host, req.body.id, req.body.code, req.body.description);
  res.json(addcountries)
}

const Put_Countries = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  var id = (req.body.id == undefined) ?"":req.body.id;
  var code = (req.body.code == undefined) ?"":req.body.code;
  var description = (req.body.description == undefined) ?"":req.body.description;

  const putcountries = await PutCountries(bd_name, host, req.params.id_params, id, code, description);
  res.json(putcountries)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllCountries,
  Add_Countries,
  Put_Countries
}