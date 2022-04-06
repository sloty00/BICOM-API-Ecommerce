//Declaracion de Constantes.
const { getMdQuoteDetail } = require('../repositories/md_quotes_details')

const getAllMdQuoteDetail = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  var invoice_date = (req.query.invoice_date == undefined) ?"":req.query.invoice_date;
  var begin_date = (req.query.begin_date == undefined) ?"":req.query.begin_date;
  var end_date = (req.query.end_date == undefined) ?"":req.query.end_date;

  const mdquotedet = await getMdQuoteDetail(bd_name, host, req.query.page, invoice_date, begin_date, end_date);
  //console.log(mdinventarios)
  res.json(mdquotedet)
};

//Exportamos la funcion para usar los datos en .router/groups.js
module.exports = {
    getAllMdQuoteDetail
}