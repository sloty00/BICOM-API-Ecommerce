//Declaracion de Constantes.
const { getMdEcommerceShipping } = require('../repositories/md_ecommerce_shipping')

const getAllEcommerceShipping = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const mdeimages = await getMdEcommerceShipping(bd_name, host, req.query.page);
  res.json(mdeimages)
};

//Exportamos la funcion para usar los datos en .router/groups.js
module.exports = {
    getAllEcommerceShipping
}