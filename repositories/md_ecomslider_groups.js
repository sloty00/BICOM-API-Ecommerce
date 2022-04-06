//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getMdEcommerceImages = async (bd_name, host, page) => {//Funcion de tipo asincronica.
    const mysql = createConnectMysql(host, bd_name)
    const eimages = await queryMdEcommerceImages(page, mysql)
    let jsonResult = {
        'total_rows': total_elementos,
        'total_page': total_paginas,
        'number_pagination': eimages.length,
        'page': page,
        'data': eimages
    }
    return jsonResult;
}

const queryMdEcommerceImages = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
    // limite de 100
    const limit = 100
    // calcula offset
    const offset = (page - 1) * limit
    // consulta de datos con numero de paginas y offset
    const eimagesQuery = "SELECT ecommerce_slider_images.id, ecommerce_slider_images.slider_img, ecommerce_slider_images.title, ecommerce_slider_images.description, ecommerce_slider_images.category_id, groups.id as groups_id, groups.description as groups_description, groups.is_ecommerce, groups.is_menu, groups.img_groups FROM ecommerce_slider_images LEFT OUTER JOIN `groups` ON ecommerce_slider_images.category_id = groups.id LIMIT " + limit + " OFFSET " + offset
    const eimage = await query(eimagesQuery, mysql);
    const totalQuery = "SELECT COUNT(*) AS id FROM ecommerce_slider_images LEFT OUTER JOIN `groups` ON ecommerce_slider_images.category_id = groups.id "
    const total = await query(totalQuery, mysql);

    total_elementos = total[0]['id']
    total_paginas= Math.ceil(total_elementos/100)
    return eimage;
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
    getMdEcommerceImages
}