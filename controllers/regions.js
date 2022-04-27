/*
-------------------------------------TABLA COMPUESTA (E/R por COUNTRIES)--------------------------------------
*/
const { getRegions, AddRegions, PutRegions } = require('../repositories/regions')

const getAllRegions = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const regions = await getRegions(bd_name, host, req.query.page);
  res.json(regions)
};

const Add_Regions = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addregions = await AddRegions(bd_name, host, req.body.id, req.body.code, req.body.description, req.body.country_id);
  res.json(addregions)
}

const Put_Regions = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  var id = (req.body.id == undefined) ?"":req.body.id;
  var code = (req.body.code == undefined) ?"":req.body.code;
  var description= (req.body.description == undefined) ?"":req.body.description;
  var country_id = (req.body.country_id == undefined) ?"":req.body.country_id;

  const putregions = await PutRegions(bd_name, host, req.params.id_params, id, code, description, country_id);
  res.json(putregions)
}

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllRegions,
  Add_Regions,
  Put_Regions
}