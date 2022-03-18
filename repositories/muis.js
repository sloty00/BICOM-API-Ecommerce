const { createConnectMysql } = require("../config/dbConnect")

const getMuis = async (bd_name, host, page) => {
    const mysql = createConnectMysql(host, bd_name)
    const muis = await queryMuis(page, mysql)
    let jsonResult = {
        'numero elementos': muis.length,
        'numero paginas': page,
        'productos': muis
    }
    return jsonResult;
}

const queryMuis = async (page, mysql) => {
    // limite de 100
    const limit = 100
    // numeros paginas

    // calcula offset
    const offset = (page - 1) * limit
    // consulta de datos con numero de paginas y offset
    const muisQuery = "select * from measurement_units limit " + limit + " OFFSET " + offset
    const mui = await query(muisQuery, mysql);
    return mui;
}

//Deberia ir en herlpers
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

module.exports = {
    getMuis
}