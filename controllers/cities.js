/*
-------------------------------------TABLA COMPUESTA (E/R por REGIONS)--------------------------------------
*/
//Declaracion de Constantes.
const { getCities, AddCities, PutCities } = require('../repositories/cities')

const getAllCities = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const cities = await getCities(bd_name, host, req.query.page);
  res.json(cities)
};


const Add_Cities = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const cities = await AddCities(bd_name, host, req.body.id, req.body.code, req.body.description, req.body.region_id);
  res.json(cities)
}

const Put_Cities = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  var id = (req.body.id == undefined) ?"":req.body.id;
  var code = (req.body.code == undefined) ?"":req.body.code;
  var description = (req.body.description == undefined) ?"":req.body.description;
  var region_id = (req.body.region_id == undefined) ?"":req.body.region_id;
  
  const putcities = await PutCities(bd_name, host, req.params.id_params, id, code, description, region_id);
  res.json(putcities)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllCities,
  Add_Cities,
  Put_Cities
}