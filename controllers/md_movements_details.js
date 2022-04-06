//Declaracion de Constantes.
const { getMdMovement } = require('../repositories/md_movements_details')

const getAllMdMovement = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  var doc_type = (req.query.doc_type == undefined) ?"":req.query.doc_type;
  var is_sii = (req.query.is_sii == undefined) ?"":req.query.is_sii;
  var consolidate = (req.query.consolidate == undefined) ?"":req.query.consolidate;
  var invoice_date = (req.query.invoice_date == undefined) ?"":req.query.invoice_date;
  var begin_date = (req.query.begin_date == undefined) ?"":req.query.begin_date;
  var end_date = (req.query.end_date == undefined) ?"":req.query.end_date;


  const mdmovement = await getMdMovement(bd_name, host, req.query.page, doc_type, is_sii, consolidate, invoice_date, begin_date, end_date);
  console.log('controller0 : '+ req.query.invoice_date);
  console.log('controler1 : ' + req.query.is_sii);
  res.json(mdmovement)
};

//Exportamos la funcion para usar los datos en .router/
module.exports = {
    getAllMdMovement
}