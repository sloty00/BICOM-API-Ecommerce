//const db = require('../config/dbConnect');
const { getMuis } = require('../repositories/muis')

const getAllMuis = async (req, res) => {
  const bd_name = 'bicom2'
  const host = "1"

  const muis = await getMuis(bd_name, host, req.query.page);
  //console.log(products)
  res.json(muis)
};

module.exports = {
  getAllMuis
}