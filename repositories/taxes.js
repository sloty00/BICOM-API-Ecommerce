/*
-------------------------------------TABLA BASE--------------------------------------
*/

const getTaxes = async (bd_name, host, page) => {//Funcion de tipo asincronica.
    const mysql = createConnectMysql(host, bd_name)
    const taxes = await queryGetAllTaxes(page, mysql)
    let jsonResult = {
      'numero elementos': taxes.length,
      'Numero paginas': page,
      "Tax's": taxes
    }
    return jsonResult;
  }
  
  const queryGetAllTaxes = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
    // limite de 100
    const limit = 100
    // calcula offset
    const offset = (page - 1) * limit
    // consulta de datos con numero de paginas y offset
    const taxesQuery = "select * from taxes limit " + limit + " OFFSET " + offset
    const taxes = await query(taxesQuery, mysql);
    return taxes;
  }
  
  //Deberia ir en herlpers
  //Controla los errores de conexion
  const query = (sql, mysql) => {
    return new Promise((resolve, reject) => {
      mysql.query(sql, (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows)
      })
    })
  }
  
  //Exportamos la funcion para usar los datos en controller/products.js.
  module.exports = {
    getTaxes
  }