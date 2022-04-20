/*
-------------------------------------TABLA COMPUESTA (E/R)--------------------------------------
*/

//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos.

const getProducts = async (bd_name, host, page, code, begin_code, end_code, is_active, is_inventory, is_ecommerce, is_ticket, is_aggregate, is_free, is_kit, group_id, sub_group_id, custom1, custom2, custom3, custom4, custom5) => {//Funcion de tipo asincronica.
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
    const prodsQuery = "SELECT prod.id as p_id, prod.`code`, prod.barcode, prod.barcode_type, prod.description_details, prod.description, prod.measurement_unit_id, prod.group_id, prod.sub_group_id, prod.price_net, prod.price_brute, prod.is_inventory, prod.is_visiblePOS, prod.is_active, prod.img_one, prod.price_lastpur, prod.stockmax, prod.stockrep, prod.stockmin, prod.measurement_unit_convert_id, prod.custom1, prod.custom2, prod.custom3, prod.custom4, prod.custom5, prod.cost_prom, prod.weight, prod.is_kit, prod.is_ticket, prod.is_aggregate, prod.is_ecommerce, prod.print_details, prod.price_net_uf, prod.is_free FROM products AS prod WHERE prod.deleted_at IS NULL " + filter_code + " " + filter_between + " " + filter_isactive + " " + filter_isinventory + " " + filter_isecommerce + " " + filter_isticket + " " + filter_isaggregate + " " + filter_isfree + " " + filter_iskit + " " + filter_groupid + " "+ filter_subgroupid + " " + filter_custom1 + " " + filter_custom2 + " " + filter_custom3 + " " + filter_custom4 + " " + filter_custom5 + " " + " LIMIT " + limit + " OFFSET " + offset
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
    getProducts
}