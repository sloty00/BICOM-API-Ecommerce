//const db = require('../config/dbConnect');
const { getGroups } = require('../repositories/groups')

const getAllGroups = async (req, res) => {
  const bd_name = 'bicom2'
  const host = "1"

  const groups = await getGroups(bd_name, host, req.query.page);
  //console.log(products)
  res.json(groups)
};

module.exports = {
  getAllGroups
}