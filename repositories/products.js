/*
-------------------------------------TABLA COMPUESTA (E/R)--------------------------------------
*/

//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos.

const getAllProducts = async (bd_name, host, page, code, begin_code, end_code, is_active, is_inventory, is_ecommerce, is_ticket, is_aggregate, is_free, is_kit, group_id, sub_group_id, custom1, custom2, custom3, custom4, custom5) => {//Funcion de tipo asincronica.
    var filter_code= '';
    var filter_begin_code= '';
    var filter_end_code = '';
    var filter_isactive = '';
    var filter_isinventory = '';
    var filter_isecommerce = '';
    var filter_isticket = '';
    var filter_isaggregate = '';
    var filter_isfree = '';
    var filter_iskit = '';
    var filter_groupid = '';
    var filter_subgroupid = '';
    var filter_custom1 = '';
    var filter_custom2 = '';
    var filter_custom3 = '';
    var filter_custom4 = '';
    var filter_custom5 = '';

    // limite de 100
    const limit = 100
    // calcula offset
    const offset = (page - 1) * limit
    const dbConnection = createConnectMysql(host, bd_name)

    switch (code !== "" && code) {
        case code:
            filter_code=" AND prod.code = " + `${code}`;
        break;
    }

    switch (begin_code !== "" && begin_code) {
        case begin_code:
            filter_begin_code=" AND prod.code >= " + `${begin_code}`;
        break;
    }

    switch (end_code !== "" && end_code) {
        case end_code:
            filter_end_code=" AND prod.code <= " + `${end_code}`;
        break;
    }

    switch (is_active !== "" && is_active) {
        case '0':
            filter_isactive=" AND (prod.is_active= 0 OR prod.is_active is null) ";
        break;

        case '1':
            filter_isactive=" AND prod.is_active= 1 ";
    }

    switch (is_inventory !== "" && is_inventory) {
        case '0':
            filter_isinventory=" AND (prod.is_inventory= 0 OR prod.is_inventory is null) ";
        break;

        case '1':
            filter_isinventory=" AND prod.is_inventory= 1 ";
    }

    switch (is_ecommerce !== "" && is_ecommerce) {
        case '0':
            filter_isecommerce=" AND (prod.is_ecommerce= 0 OR prod.is_ecommerce is null) ";
        break;

        case '1':
            filter_isecommerce=" AND prod.is_ecommerce= 1 ";
    }

    switch (is_ticket !== "" && is_ticket) {
        case '0':
            filter_isticket=" AND (prod.is_ticket= 0 OR prod.is_ticket is null) ";
        break;

        case '1':
            filter_isticket=" AND prod.is_ticket= 1 ";
    }

    switch (is_aggregate !== "" && is_aggregate) {
        case '0':
            filter_isaggregate=" AND (prod.is_aggregate= 0 OR prod.is_aggregate is null) ";
        break;

        case '1':
            filter_isaggregate=" AND prod.is_aggregate= 1 ";
    }

    switch (is_aggregate !== "" && is_aggregate) {
        case '0':
            filter_isaggregate=" AND (prod.is_aggregate= 0 OR prod.is_aggregate is null) ";
        break;

        case '1':
            filter_isaggregate=" AND prod.is_aggregate= 1 ";
    }

    switch (is_free !== "" && is_free) {
        case '0':
            filter_isfree=" AND (prod.is_free= 0 OR prod.is_free is null) ";
        break;

        case '1':
            filter_isfree=" AND prod.is_free= 1 ";
    }

    switch (is_kit !== "" && is_kit) {
        case '0':
            filter_iskit=" AND (prod.is_kit= 0 OR prod.is_kit is null) ";
        break;

        case '1':
            filter_iskit=" AND prod.is_kit= 1 ";
    }

    switch (group_id !== "" && group_id) {
        case group_id:
            filter_groupid=" AND prod.group_id= " + `${group_id}`;
        break;
    }

    switch (sub_group_id !== "" && sub_group_id) {
        case sub_group_id:
            filter_subgroupid=" AND prod.sub_group_id= " + `${sub_group_id}`;
        break;
    }

    switch (custom1 !== "" && custom1) {
        case custom1:
            filter_custom1=" AND prod.custom1= " + `'${custom1}'`;
        break;
    }

    switch (custom2 !== "" && custom2) {
        case custom2:
            filter_subgroupid=" AND prod.custom2= " + `'${custom2}'`;
        break;
    }

    switch (custom3 !== "" && custom3) {
        case custom3:
            filter_custom3=" AND prod.custom3= " + `'${custom3}'`;
        break;
    }

    switch (custom4 !== "" && custom4) {
        case custom4:
            filter_subgroupid=" AND prod.custom4= " + `'${custom4}'`;
        break;
    }

    switch (custom5 !== "" && custom5) {
        case custom5:
            filter_custom5=" AND prod.custom5= " + `'${custom5}'`;
        break;
    }

    var filter_between = filter_begin_code + filter_end_code;

    const products = await queryProducts(dbConnection, filter_code, filter_between, filter_isactive, filter_isinventory, filter_isecommerce, filter_isticket, filter_isaggregate, filter_isfree, filter_iskit, filter_groupid, filter_custom1, filter_custom2, filter_custom3, filter_custom4, filter_custom5, filter_subgroupid, limit, offset)

    var id_prod = [];
    for (prod_id of products) {
        id_prod.push(prod_id['p_id']);
    }

    const Taxes = await queryTaxes(dbConnection, id_prod, limit, offset)
    let jsonResult = {
        'total_rows': total_elementos,
        'total_page': total_paginas,
        'number_pagination': products.length,
        'page': page,
        'products': products,
        'taxes': Taxes
    }
    return jsonResult;
}

const queryProducts = async (dbConnection, filter_code, filter_between, filter_isactive, filter_isinventory, filter_isecommerce, filter_isticket, filter_isaggregate, filter_isfree, filter_iskit, filter_groupid, filter_subgroupid, filter_custom1, filter_custom2, filter_custom3, filter_custom4, filter_custom5, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
    // consulta de datos con numero de paginas y offset
    const prodsQuery = "SELECT prod.id as p_id, prod.`code`,  prod.barcode, prod.barcode_type, prod.description_details, prod.description, prod.measurement_unit_id, prod.group_id, prod.sub_group_id, prod.price_net, prod.price_brute, prod.is_inventory, prod.is_visiblePOS, prod.is_active, prod.img_one, prod.price_lastpur, prod.stockmax, prod.stockrep, prod.stockmin, prod.measurement_unit_convert_id, prod.custom1, prod.custom2, prod.custom3, prod.custom4, prod.custom5, prod.cost_prom, prod.weight, prod.is_kit, prod.is_ticket, prod.is_aggregate, prod.is_ecommerce, prod.print_details, prod.price_net_uf, prod.is_free FROM products AS prod WHERE prod.deleted_at IS NULL " + filter_code + " " + filter_between + " " + filter_isactive + " " + filter_isinventory + " " + filter_isecommerce + " " + filter_isticket + " " + filter_isaggregate + " " + filter_isfree + " " + filter_iskit + " " + filter_groupid + " "+ filter_subgroupid + " " + filter_custom1 + " " + filter_custom2 + " " + filter_custom3 + " " + filter_custom4 + " " + filter_custom5 + " " + " LIMIT " + limit + " OFFSET " + offset
    const prod = await query(prodsQuery, dbConnection);
    const totalQuery = "SELECT COUNT(*) AS id FROM products AS prod WHERE prod.deleted_at IS NULL " + filter_code + filter_between + filter_isactive + filter_isinventory + filter_isecommerce + filter_isticket + filter_isaggregate + filter_isfree + filter_iskit + filter_groupid + filter_subgroupid + filter_custom1 + filter_custom2 + filter_custom3 + filter_custom4 + filter_custom5 
    const total = await query(totalQuery, dbConnection);

    total_elementos = total[0]['id']
    total_paginas = Math.ceil(total_elementos/100)
    return prod;
}

const queryTaxes = async (dbConnection, id_prod, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
    // consulta de datos con numero de paginas y offset
    const taxQuery = "SELECT * FROM product_taxes WHERE product_id IN ("+id_prod +")" + " LIMIT " + limit + " OFFSET " + offset
    const tax = await query(taxQuery, dbConnection);
    return tax;
}

const AddProducts = async (bd_name, host, id, code, barcode, barcode_type, description, description_details, measurement_unit_id, group_id, sub_group_id, price_net, price_brute, is_inventory, is_visiblePOS, is_active, img_one, price_lastpur, stockmax, stockrep, stockmin, measurement_unit_convert_id, custom1, custom2, custom3, custom4, custom5, cost_prom, weight, is_kit, is_ticket, is_aggregate, is_ecommerce, print_details, price_net_uf, is_free) => {
    var id, code, barcode, barcode_type, description, description_details, measurement_unit_id, group_id, sub_group_id, price_net, price_brute, is_inventory, is_visiblePOS, is_active, img_one, price_lastpur, stockmax, stockrep, stockmin, measurement_unit_convert_id, custom1, custom2, custom3, custom4, custom5, cost_prom, weight, is_kit, is_ticket, is_aggregate, is_ecommerce, print_details, price_net_uf, is_free;
    var f = new Date();
    var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
    const mysql = createConnectMysql(host, bd_name)
    const productsAddQuery = "INSERT INTO products (id, `code`, barcode, barcode_type, description, description_details, measurement_unit_id, group_id, sub_group_id, price_net, cl_price_net_prod, cl_price_net_logistic, price_brute, is_inventory, is_visiblePOS, is_active, img_one, price_lastpur, stockmax, stockrep, stockmin, measurement_unit_convert_id, custom1, custom2, custom3, custom4, custom5, cost_prom, weight, is_kit, has_kit, is_ticket, is_aggregate, is_ecommerce, print_details, is_recurrent, price_net_uf, is_free, created_at, updated_at) VALUES (" + id + ", '" + code + "', '" + barcode + "', '" + barcode_type + "', '" +description + "', '" + description_details + "', " + measurement_unit_id + ", " + group_id + ", " + sub_group_id + ", " + price_net + ", " + 0 + ", " + 0 + ", " + price_brute + ", " + is_inventory + ", " + is_visiblePOS + ", " + is_active + ", '" + img_one + "', " + price_lastpur + ", " + stockmax + ", " + stockrep + ", " + stockmin + ", " + measurement_unit_convert_id + ", '" + custom1 + "', '" + custom2 + "', '" + custom3 + "', '" + custom4 + "', '" + custom5 + "', " + cost_prom + ", " + weight + ", " + is_kit + ", " + 0 + ", " + is_ticket + ", " + is_aggregate + ", " + is_ecommerce + ", " + print_details + ", " + 0 + ", " + price_net_uf + ", " + is_free + ", '" + datenow + "', '" + datenow + "')"
    const addproducts = await query(productsAddQuery, mysql);
    return addproducts;
    
}

const PutProducts = async (bd_name, host, id_params, id, code, barcode, barcode_type, description, description_details, measurement_unit_id, group_id, sub_group_id, price_net, price_brute, is_inventory, is_visiblePOS, is_active, img_one, price_lastpur, stockmax, stockrep, stockmin, measurement_unit_convert_id, custom1, custom2, custom3, custom4, custom5, cost_prom, weight, is_kit, is_ticket, is_aggregate, is_ecommerce, print_details, price_net_uf, is_free) => {
    var id, code, barcode, barcode_type, description, description_details, measurement_unit_id, group_id, sub_group_id, price_net, price_brute, is_inventory, is_visiblePOS, is_active, img_one, price_lastpur, stockmax, stockrep, stockmin, measurement_unit_convert_id, custom1, custom2, custom3, custom4, custom5, cost_prom, weight, is_kit, is_ticket, is_aggregate, is_ecommerce, print_details, price_net_uf, is_free;
    var f_id, f_code, f_barcode, f_barcode_type, f_description, f_description_details, f_measurement_unit_id, f_group_id, f_sub_group_id, f_price_net, f_price_brute, f_is_inventory, f_is_visiblePOS, f_is_active, f_img_one, f_price_lastpur, f_stockmax, f_stockrep, f_stockmin, f_measurement_unit_convert_id, f_custom1, f_custom2, f_custom3, f_custom4, f_custom5, f_cost_prom, f_weight, f_is_kit, f_is_ticket, f_is_aggregate, f_is_ecommerce, f_print_details, f_price_net_uf, f_is_free;
    var f = new Date();
    f_id = ( !id || id == '' ) ?f_id = "" : f_id = "id = " + id + ", ";
    f_code = ( !code || code == '' ) ?f_code = "" : f_code = "code = '" + code + "', ";
    f_barcode = ( !barcode || barcode == '' ) ?f_barcode = "" : f_barcode = "barcode = '" + barcode + "', ";
    f_barcode_type = ( !barcode_type || barcode_type == '' ) ?f_barcode_type = "" : f_barcode_type = "barcode_type = " + barcode_type + ", ";
    f_description = ( !description || description == '' ) ?f_description = "" : f_description = "description = '" + description + "', ";
    f_description_details = ( !description_details || description_details == '' ) ?f_description_details = "" : f_description_details = "description_details = '" + description_details + "', ";
    f_measurement_unit_id = ( !measurement_unit_id || measurement_unit_id == '' ) ?f_measurement_unit_id = "" : f_measurement_unit_id = "measurement_unit_id = " + measurement_unit_id + ", ";
    f_group_id = ( !group_id || group_id == '' ) ?f_group_id = "" : f_group_id = "group_id = " + group_id + ", ";
    f_sub_group_id = ( !sub_group_id || sub_group_id == '' ) ?f_sub_group_id = "" : f_sub_group_id = "sub_group_id = " + sub_group_id + ", ";
    f_price_net = ( !price_net || price_net == '' ) ?f_price_net = "" : f_price_net = "price_net = " + price_net + ", ";
    f_price_brute = ( !price_brute || price_brute == '' ) ?f_price_brute = "" : f_price_brute = "price_brute = " + price_brute + ", ";
    f_is_inventory = ( !is_inventory || is_inventory == '' ) ?f_is_inventory = "" : f_is_inventory = "is_inventory = " + is_inventory + ", ";
    f_is_visiblePOS = ( !is_visiblePOS || is_visiblePOS == '' ) ?f_is_visiblePOS = "" : f_is_visiblePOS = "is_visiblePOS = " + is_visiblePOS + ", ";
    f_is_active = ( !is_active || is_active == '' ) ?f_is_active = "" : f_is_active = "is_active = " + is_active + ", ";
    f_img_one = ( !img_one || img_one == '' ) ?f_img_one = "" : f_img_one = "img_one = '" + img_one + "', ";
    f_price_lastpur = ( !price_lastpur || price_lastpur == '' ) ?f_price_lastpur = "" : f_price_lastpur = "price_lastpur = " + price_lastpur + ", ";
    f_stockmax = ( !stockmax || stockmax == '' ) ?f_stockmax = "" : f_stockmax = "stockmax = " + stockmax + ", ";
    f_stockrep = ( !stockrep || stockrep == '' ) ?f_stockrep = "" : f_stockrep = "stockrep = " + stockrep + ", ";
    f_stockmin = ( !stockmin || stockmin == '' ) ?f_stockmin = "" : f_stockmin = "stockmin = " + stockmin + ", ";
    f_measurement_unit_convert_id = ( !measurement_unit_convert_id || measurement_unit_convert_id == '' ) ?f_measurement_unit_convert_id = "" : f_measurement_unit_convert_id = "measurement_unit_convert_id = " + measurement_unit_convert_id + ", ";
    f_custom1 = ( !custom1 || custom1 == '' ) ?f_custom1 = "" : f_custom1 = "custom1 = '" + custom1 + "', ";
    f_custom2 = ( !custom2 || custom2 == '' ) ?f_custom2 = "" : f_custom2 = "custom2 = '" + custom2 + "', ";
    f_custom3 = ( !custom3 || custom3 == '' ) ?f_custom3 = "" : f_custom3 = "custom3 = '" + custom3 + "', ";
    f_custom4 = ( !custom4 || custom4 == '' ) ?f_custom4 = "" : f_custom4 = "custom4 = '" + custom4 + "', ";
    f_custom5 = ( !custom5 || custom5 == '' ) ?f_custom5 = "" : f_custom5 = "custom5 = '" + custom5 + "', ";
    f_cost_prom = ( !cost_prom || cost_prom == '' ) ?f_cost_prom = "" : f_cost_prom = "cost_prom = " + cost_prom + ", ";
    f_weight = ( !weight || weight == '' ) ?f_weight = "" : f_weight = "weight = " + weight + ", ";
    f_is_kit = ( !is_kit|| is_kit == '' ) ?f_is_kit = "" : f_is_kit = "is_kit = " + is_kit + ", ";
    f_is_ticket = ( !is_ticket|| is_ticket == '' ) ?f_is_ticket = "" : f_is_ticket = "is_ticket = " + is_ticket + ", ";
    f_is_aggregate = ( !is_aggregate || is_aggregate == '' ) ?f_is_aggregate = "" : f_is_aggregate = "is_aggregate = " + is_aggregate + ", ";
    f_is_ecommerce = ( !is_ecommerce || is_ecommerce == '' ) ?f_is_ecommerce = "" : f_is_ecommerce = "is_ecommerce = " + is_ecommerce + ", ";
    f_print_details = ( !print_details || print_details == '' ) ?f_print_details = "" : f_print_details = "print_details = " + print_details + ", ";
    f_price_net_uf = ( !price_net_uf || price_net_uf == '' ) ?f_price_net_uf = "" : f_price_net_uf = "price_net_uf = " + price_net_uf + ", ";
    f_is_free = ( !is_free || is_free == '' ) ?f_is_free = "" : f_is_free = "is_free = " + is_free + ", ";

    var datenow = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " " + (f.getHours()) + ":" + (f.getMinutes()) + ":" + (f.getSeconds()));
    const mysql = createConnectMysql(host, bd_name)
    const productsPutQuery = "UPDATE products SET " + f_id + f_code + f_barcode + f_barcode_type + f_description + f_description_details + f_measurement_unit_id + f_group_id + f_sub_group_id + f_price_net + f_price_brute + f_is_inventory + f_is_visiblePOS + f_is_active + f_img_one + f_price_lastpur + f_stockmax + f_stockrep + f_stockmin + f_measurement_unit_convert_id + f_custom1 + f_custom2 + f_custom3 + f_custom4 + f_custom5 + f_cost_prom + f_weight + f_is_kit + f_is_ticket + f_is_aggregate + f_is_ecommerce + f_print_details + f_price_net_uf + f_is_free + "updated_at = '" + datenow + "'  WHERE id = " + id_params
    const putproducts = await query(productsPutQuery, mysql);
    console.log(productsPutQuery);
    return putproducts;
}

//Controla los errores de conexion
const query = (sql, dbConnection) => {
    return new Promise((resolve, reject) => {
        dbConnection.query(sql, (err, rows) => {

            if (err) {
                return reject(err);
            }
            return resolve(rows)
        })
    })
}

//Exportamos la funcion para usar los datos en controller/products.js.
module.exports = {
    getAllProducts,
    AddProducts,
    PutProducts
}