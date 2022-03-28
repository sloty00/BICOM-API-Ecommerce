//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getMdEcommP = async (bd_name, host, page) => {//Funcion de tipo asincronica.
    const mysql = createConnectMysql(host, bd_name)
    const ecomps = await queryEcommp(page, mysql)
    let jsonResult = {
        'numero elementos': ecomps.length,
        'numero paginas': page,
        'Ecommerce Parameters: ': ecomps
    }
    return jsonResult;
}

const queryEcommp = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
    // limite de 100
    const limit = 100
    // calcula offset
    const offset = (page - 1) * limit
    // consulta de datos con numero de paginas y offset
    const ecommpQuery = "SELECT ecommp.id, ecommp.top_message, ecommp.img_slider_one, ecommp.img_slider_two, ecommp.img_slider_three, ecommp.txt_slider_one, ecommp.txt_slider_two, ecommp.txt_slider_three, ecommp.txt_two_slider_one, ecommp.txt_two_slider_two, ecommp.txt_two_slider_three, ecommp.category_slider_one, ecommp.category_slider_two, ecommp.category_slider_three, ecommp.img_facebook_thumbnail, ecommp.img_about_one, ecommp.txt_about_one, ecommp.deleted_at, ecommp.created_at, ecommp.updated_at, ecommp.email_contact_web, ecommp.template_send_mail, ecommp.template_send_mail_order, ecommp.longitude, ecommp.latitude, ecommp.payment_type, ecommp.payment_methods, ecommp.commerce_code, ecommp.public_key, ecommp.private_key, ecommp.transbank_key, ecommp.api_key, ecommp.secret_key, ecommp.color_picker, ecommp.hours, ecommp.prod_cert, ecommp.email_one, ecommp.email_two, ecommp.email_three, ecommp.email_four, ecommp.social_network_one, ecommp.social_network_two, ecommp.social_network_three, ecommp.social_network_four, ecommp.img_out_stock, ecommp.view_out_of_stock, ecommp.sell_out_of_stock, ecommp.seller_id, ecommp.product_dispatch_id, ecommp.price_product_dispatch, ecommp.has_pickup, ecommp.has_delivery, ecommp.wsp_title, ecommp.wsp_message, ecommp.wsp_number, ecommp.img_placeholder, ecommp.img_favicon, ecommp.warehouse_id, ecommp.has_share, sell.id, sell.user_id, ware.id, ware.`code`, ware.description, ware.address, ware.is_ecommerce FROM (ecommerce_parameters AS ecommp INNER JOIN sellers as sell ON ecommp.seller_id = sell.id) INNER JOIN warehouses as ware ON ecommp.warehouse_id = ware.id limit " + limit + " OFFSET " + offset
    const ecommp = await query(ecommpQuery, mysql);
    return ecommp;
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
    getMdEcommP
}