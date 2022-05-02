/*
-------------------------------------TABLA BASE--------------------------------------
*/

const getTaxes = async (bd_name, host, page) => {//Funcion de tipo asincronica.
    // limite de 100
    const limit = 100
    // calcula offset
    const offset = (page - 1) * limit
    const mysql = createConnectMysql(host, bd_name)
    const taxes = await queryGetAllTaxes(page, mysql, limit, offset)
    let jsonResult = {
      'total_rows': total_elementos,
      'total_page': total_paginas,
      'number_pagination': taxes.length,
      'page': page,
      "data": taxes
    }
    return jsonResult;
}
  
  const queryGetAllTaxes = async (page, mysql, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
    // consulta de datos con numero de paginas y offset
    const taxesQuery = "SELECT taxes.id, taxes.`code`, taxes.description, taxes.`value`, taxes.type FROM taxes WHERE deleted_at IS NULL LIMIT " + limit + " OFFSET " + offset
    const taxes = await query(taxesQuery, mysql);
    const totalQuery = "SELECT COUNT(*) as id FROM taxes WHERE deleted_at IS NULL "
    const total = await query(totalQuery, mysql);

    total_elementos = total[0]['id']
    total_paginas = Math.ceil(total_elementos/100)
    return taxes;
  }

  const AddTaxes = async (bd_name, host, id, code, description, value, type) => {
    
    var id, code, description, value, type;
    var f = new Date();
    var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
    const mysql = createConnectMysql(host, bd_name)
    const taxesAddQuery = "INSERT INTO taxes (id, `code`, description, value, type, created_at, updated_at) VALUES" + " (" + id + ", '" + code + "', '" + description + "', '" + value + "', " + type + ", '" + datenow + "', '" + datenow + "')"
    const addtaxes = await query(taxesAddQuery, mysql);
    return addtaxes;
  }

  const PutTaxes = async (bd_name, host, id_params, id, code, description, value, type) => {
    var id, code, description, value, type;
    var f_id, f_code, f_description, f_value, f_type;
    var f = new Date();

    f_id = ( !id || id == '' ) ?f_id = "" : f_id = "id = " + id + ", ";
    f_code = ( !code || code == '' ) ?f_code = "" : f_code = "code = '" + code + "', ";
    f_description = ( !description || description == '' ) ?f_description = "" : f_description = "description = '" + description + "', ";
    f_value = ( !value || value == '' ) ?f_value = "" : f_value = "value = " + value + ", ";
    f_type = ( !type || type == '' ) ?f_type = "" : f_type = "type = " + type + ", ";

    var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
    const mysql = createConnectMysql(host, bd_name)
    const taxesPutQuery = "UPDATE taxes SET " + f_id + f_code + f_description + f_value + f_type + "updated_at = '" + datenow + "'  WHERE id = " + id_params
    const puttaxes = await query(taxesPutQuery, mysql);
    console.log(taxesPutQuery);
    return puttaxes;
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
    getTaxes,
    AddTaxes,
    PutTaxes
  }