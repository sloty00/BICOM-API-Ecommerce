//Declaracion de Constantes.
const { getMdListprice } = require('../repositories/md_listprices_products')

const getAllMdListprice = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const mdlistprice = await getMdListprice(bd_name, host, req.query.page);
  //console.log(mdinventarios)
  res.json(mdlistprice)
};

//Exportamos la funcion para usar los datos en .router/groups.js
module.exports = {
    getAllMdListprice
}