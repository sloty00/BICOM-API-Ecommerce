/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { getMuis, AddMunits, PutMunits } = require('../repositories/muis')

const getAllMuis = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const muis = await getMuis(bd_name, host, req.query.page);
  res.json(muis)
};

const Add_Munits = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const addmuis = await AddMunits(bd_name, host, req.body.id, req.body.code, req.body.description);
  res.json(addmuis)
}

const Put_Munits = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  var id = (req.body.id == undefined) ?"":req.body.id;
  var code = (req.body.code == undefined) ?"":req.body.code;
  var description = (req.body.description == undefined) ?"":req.body.description;

  const putmuis = await PutMunits(bd_name, host, req.params.id_params, id, code, description);
  res.json(putmuis)
}


//Exportamos la funcion para usar los datos en .router/muis.js
module.exports = {
  getAllMuis,
  Add_Munits,
  Put_Munits
}