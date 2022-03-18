//const db = require('../config/dbConnect');
const { getCustomers } = require('../repositories/customers')

const getAllCustomers = async (req, res) => {
  const bd_name = 'bicom2'
  const host = "1"

  const customers = await getCustomers(bd_name, host, req.query.page);
  //console.log(products)
  res.json(customers)
};

module.exports = {
  getAllCustomers
}