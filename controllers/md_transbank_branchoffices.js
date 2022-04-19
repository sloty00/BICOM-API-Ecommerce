//Declaracion de Constantes.
const { getMdTransbankBranch } = require('../repositories/md_transbank_branchoffices')

const getAllMdTransbankBranch = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"

  const mdtransbranch = await getMdTransbankBranch(bd_name, host, req.query.page);
  res.json(mdtransbranch)
};

//Exportamos la funcion para usar los datos en .router/groups.js
module.exports = {
    getAllMdTransbankBranch
}