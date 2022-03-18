//onst db = require('../config/dbConnect');
const { getProducts } = require('../repositories/products')

const getAllProducts = async (req, res) => {
  const bd_name = 'bicom2'
  const host = "1"

  const products = await getProducts(bd_name, host, req.query.page);
  //console.log(products)
  res.json(products)
};

module.exports = {
  getAllProducts
}