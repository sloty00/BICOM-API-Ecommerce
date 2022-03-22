/*
-------------------------------------------TABLA BASE-------------------------------------------------
*/
//Declaracion de Constantes.
const { getWarehouses } = require('../repositories/warehouses')

const getAllWarehouses = async (req, res) => {
  const bd_name = 'bicom2'
  const host = "1"

  const warehouses = await getWarehouses(bd_name, host, req.query.page);
  //console.log(warehouses)
  res.json(warehouses)
};

//Exportamos la funcion para usar los datos en .router/customers.js
module.exports = {
  getAllWarehouses
}