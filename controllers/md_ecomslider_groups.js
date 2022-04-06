//Declaracion de Constantes.
const { getMdEcommerceImages } = require('../repositories/md_ecomslider_groups')

const getAllEcommerceImages = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const mdeimages = await getMdEcommerceImages(bd_name, host, req.query.page);
  //console.log(mdeimages)
  res.json(mdeimages)
};

//Exportamos la funcion para usar los datos en .router/groups.js
module.exports = {
    getAllEcommerceImages
}