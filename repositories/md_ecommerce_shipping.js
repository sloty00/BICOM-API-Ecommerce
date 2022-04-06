//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getMdEcommerceShipping = async (bd_name, host, page) => {//Funcion de tipo asincronica.
    const mysql = createConnectMysql(host, bd_name)
    const eimages = await queryMdEcommerceShippping(page, mysql)
    let jsonResult = {
        'total_rows': total_elementos,
        'total_page': total_paginas,
        'number_pagination': eimages.length,
        'pages': page,
        'data': eimages
    }
    return jsonResult;
}

const queryMdEcommerceShippping = async (page, mysql) => {//Funcion de tipo asincronica, realiza la consulta.
    // limite de 100
    const limit = 100
    // calcula offset
    const offset = (page - 1) * limit
    // consulta de datos con numero de paginas y offset
    const eshippingsQuery = "SELECT ecommerce_parameters.id, ecommerce_parameters.top_message, ecommerce_parameters.img_slider_one, ecommerce_parameters.img_slider_two, ecommerce_parameters.img_slider_three, ecommerce_parameters.txt_slider_one, ecommerce_parameters.txt_slider_two, ecommerce_parameters.txt_slider_three, ecommerce_parameters.txt_two_slider_one, ecommerce_parameters.txt_two_slider_two, ecommerce_parameters.txt_two_slider_three, ecommerce_parameters.category_slider_one, ecommerce_parameters.category_slider_two, ecommerce_parameters.category_slider_three, ecommerce_parameters.img_facebook_thumbnail, ecommerce_parameters.img_about_one, ecommerce_parameters.txt_about_one, ecommerce_parameters.email_contact_web, ecommerce_parameters.template_send_mail, ecommerce_parameters.template_send_mail_order, ecommerce_parameters.longitude, ecommerce_parameters.latitude, ecommerce_parameters.payment_type, ecommerce_parameters.payment_methods, ecommerce_parameters.commerce_code, ecommerce_parameters.public_key, ecommerce_parameters.private_key, ecommerce_parameters.transbank_key, ecommerce_parameters.api_key, ecommerce_parameters.secret_key, ecommerce_parameters.color_picker, ecommerce_parameters.hours, ecommerce_parameters.prod_cert, ecommerce_parameters.email_one, ecommerce_parameters.email_two, ecommerce_parameters.email_three, ecommerce_parameters.email_four, ecommerce_parameters.social_network_one, ecommerce_parameters.social_network_two, ecommerce_parameters.social_network_three, ecommerce_parameters.social_network_four, ecommerce_parameters.img_out_stock, ecommerce_parameters.view_out_of_stock, ecommerce_parameters.sell_out_of_stock, ecommerce_parameters.seller_id, ecommerce_parameters.product_dispatch_id, ecommerce_parameters.price_product_dispatch, ecommerce_parameters.has_pickup, ecommerce_parameters.has_delivery, ecommerce_parameters.wsp_title, ecommerce_parameters.wsp_message, ecommerce_parameters.wsp_number, ecommerce_parameters.img_placeholder, ecommerce_parameters.img_favicon, ecommerce_parameters.warehouse_id, ecommerce_parameters.has_share,shipping_services.id as services_id, shipping_services.`name`, shipping_services.logo_path, shipping_services.product_id, shipping_services.is_active, shipping_services.is_ecommerce FROM `ecommerce_parameters` LEFt JOIN shipping_services ON shipping_services.is_ecommerce = '1' LIMIT " + limit + " OFFSET " + offset
    const eshipping = await query(eshippingsQuery, mysql);
    const totalQuery = "SELECT COUNT(*) AS id FROM `ecommerce_parameters` LEFt JOIN shipping_services ON shipping_services.is_ecommerce = '1' "
    const total = await query(totalQuery, mysql);

    total_elementos = total[0]['id']
    total_paginas= Math.ceil(total_elementos/100)
    return eshipping;
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
    getMdEcommerceShipping
}