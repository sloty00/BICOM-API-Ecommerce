/*
-------------------------------------TABLA BASE--------------------------------------
*/
//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos.

const getMuis = async (bd_name, host, page) => {//Funcion de tipo asincronica.
    // limite de 100
    const limit = 100
    // calcula offset
    const offset = (page - 1) * limit
    const mysql = createConnectMysql(host, bd_name)
    const muis = await queryMuis(page, mysql, limit, offset)
    let jsonResult = {
        'total_rows': total_elementos,
        'total_page': total_page,
        'number_pagination': muis.length,
        'page': page,
        'data': muis
    }
    return jsonResult;
}

const queryMuis = async (page, mysql, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
    // consulta de datos con numero de paginas y offset
    const muisQuery = "SELECT measurement_units.id, measurement_units.`code`, measurement_units.description FROM measurement_units WHERE deleted_at IS NULL LIMIT " + limit + " OFFSET " + offset
    const mui = await query(muisQuery, mysql);
    const totalQuery = "SELECT COUNT(*) AS id FROM measurement_units WHERE deleted_at IS NULL"
    const total = await query(totalQuery, mysql);

    total_elementos = total[0]['id']
    total_page = Math.ceil(total_elementos/100)
    return mui;
}

const AddMunits = async (bd_name, host, id, code, description) => {
    var id, code, description;
    var f = new Date();
    var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
    const mysql = createConnectMysql(host, bd_name)
    const muisAddQuery = "INSERT INTO measurement_units (id, code, description, created_at, updated_at) VALUES" + " (" + id + ", '" + code + "', '" + description + "', '" + datenow + "', '" + datenow + "')"
    const addmuis = await query(muisAddQuery, mysql);
    return addmuis;
}

const PutMunits = async (bd_name, host, id_params, id, code, description) => {
    var id, code, description;
    var f_id, f_code, f_description;
    var f = new Date();

    f_id = ( !id || id == '' ) ?f_id = "" : f_id = "id = " + id + ", ";
    f_code = ( !code || code == '' ) ?f_code = "" : f_code = "code = '" + code + "', ";
    f_description = ( !description || description == '' ) ?f_description = "" : f_description = "description = '" + description + "', ";

    var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
    const mysql = createConnectMysql(host, bd_name)
    const muisPutQuery = "UPDATE measurement_units SET " + f_id + f_code + f_description + "updated_at = '" + datenow + "'  WHERE id = " + id_params
    const putmuis = await query(muisPutQuery, mysql);
    console.log(muisPutQuery);
    return putmuis;
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
    getMuis,
    AddMunits,
    PutMunits
}