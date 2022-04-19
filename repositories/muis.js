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
    getMuis
}