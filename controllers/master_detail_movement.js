//Declaracion de Constantes.
const { getMdMovement } = require('../repositories/master_detail_movement')

const getAllMdMovement = async (req, res) => {
  const bd_name = 'bicom2'
  const host = "1"

  const mdmovement = await getMdMovement(bd_name, host, req.query.page, req.query.doc_type);
  //console.log("controller: "+doc_type)
  console.log("controller: "+req.query.doc_type)
  res.json(mdmovement)
};

//Exportamos la funcion para usar los datos en .router/
module.exports = {
    getAllMdMovement
}