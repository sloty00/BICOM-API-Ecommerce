//Declaracion de Constantes.
const { getMdBimarketDetail } = require('../repositories/md_bimarkets_details')

const getAllMdBimarketDetail = async (req, res) => {
  const bd_name = process.env.BC_DATABASE_MYSQL_1
  const host = "1"
  var invoice_date = (req.query.invoice_date == undefined) ?"":req.query.invoice_date;
  var begin_date = (req.query.begin_date == undefined) ?"":req.query.begin_date;
  var end_date = (req.query.end_date == undefined) ?"":req.query.end_date;

  const mdproduct = await getMdBimarketDetail(bd_name, host, req.query.page, invoice_date, begin_date, end_date);
  //console.log(mdinventarios)
  res.json(mdproduct)
};

//Exportamos la funcion para usar los datos en .router/groups.js
module.exports = {
    getAllMdBimarketDetail
}