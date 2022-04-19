//Declaracion de Constantes.
const { getMdProductTaxes } = require('../repositories/md_products_taxes')

const getAllMdProductTaxes = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const mdproducttax = await getMdProductTaxes(bd_name, host, req.query.page);
  res.json(mdproducttax)
};

//Exportamos la funcion para usar los datos en .router/groups.js
module.exports = {
    getAllMdProductTaxes
}