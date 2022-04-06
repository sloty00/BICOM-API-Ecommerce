/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { getPosMachines } = require('../repositories/posmachines')

const getAllPosMachines = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const pmachines = await getPosMachines(bd_name, host, req.query.page);
  //console.log(pmachines)
    res.json(pmachines)
};

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllPosMachines
}