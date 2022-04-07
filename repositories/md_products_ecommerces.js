//Declaracion de Constantes.
const { createConnectMysql } = require("../config/dbConnect")//Conexion a base de datos

const getMdProduct = async (bd_name, host, page, is_active, is_inventory, is_ecommerce, is_ticket, is_aggregate, is_free, is_kit, group_id, subgroup_id, custom1, custom2, custom3, custom4, custom5) => {//Funcion de tipo asincronica.
    filter_isactive = "";
    filter_isinventory = "";
    filter_isecommerce = "";
    filter_isticket = "";
    filter_isaggregate = "";
    filter_isfree = "";
    filter_iskit = "";
    filter_groupid = "";
    filter_subgroupid = "";
    filter_custom1 = "";
    filter_custom2 = "";
    filter_custom3 = "";
    filter_custom4 = "";
    filter_custom5 = "";
    const limit = 100
    const offset = (page - 1) * limit

    const mysql = createConnectMysql(host, bd_name)

    if(is_active == '0' && is_active) {
        filter_isactive="AND (prod.is_active= 0 OR prod.is_active is null)";
        console.log('No esta Activa1');
    }else if(is_active == '1' && is_active) {
        filter_isactive="AND prod.is_active= 1 ";
        console.log('Esta Activa1');
    }

    if(is_inventory == '0' && is_inventory){
        filter_isinventory="AND (prod.is_inventory= 0 OR prod.is_inventory is null) ";
        console.log('Producto no es inventariable1');
    }else if(is_inventory == '1' && is_inventory){
        filter_isinventory="AND prod.is_inventory= 1 ";
        console.log('Producto es inventariable1')
    }

    if(is_ecommerce == '0' && is_ecommerce){
        filter_isecommerce="AND (prod.is_ecommerce= 0 OR prod.is_ecommerce is null) ";
        console.log('Producto no aparece en el ecommerce1');
    }else if(is_ecommerce == '1' && is_ecommerce){
        filter_isecommerce="AND prod.is_ecommerce= 1 ";
        console.log('Producto aparece en el ecommerce1');
    }

    if(is_ticket == '0' && is_ticket){
        filter_isticket="AND (prod.is_ticket= 0 OR prod.is_ticket is null)";
        console.log('Producto no trabaja con ticket de cambio1');
    }else if(is_ticket == '1' && is_ticket){
        filter_isticket="AND prod.is_ticket= 1 ";
        console.log('Producto trabaja con ticket de cambio1');
    }

    if(is_aggregate == '0' && is_aggregate){
        filter_isaggregate="AND (prod.is_aggregate= 0 OR prod.is_aggregate is null)";
        console.log('Producto no es agregado para el modulo bigourmet1');
    }else if(is_aggregate == '1' && is_aggregate){
        filter_isaggregate="AND prod.is_aggregate= 1 ";
        console.log('Producto es agregado para el modulo bigourmet1');
    }

    if(is_free == '0' && is_free){
        filter_isfree="AND (prod.is_free= 0 OR prod.is_free is null)";
        console.log('Producto no es agregado para el modulo bigourmet1');
    }else if(is_free == '1' && is_free){
        filter_isfree="AND prod.is_free= 1 ";
        console.log('Producto es agregado para el modulo bigourmet1');
    }

    if(is_kit == '0' && is_kit){
        filter_iskit="AND (prod.is_kit= 0 OR prod.is_kit is null)";
        console.log('Producto no es producto kit1');
    }else if(is_kit == '1' && is_kit){
        filter_iskit="AND prod.is_kit= 1 ";
        console.log('Producto es producto kit1');
    }

    if(group_id !== "" && group_id) {
        filter_groupid="AND prod.group_id= "+`${group_id}`;
    }
    
    if (group_id == 'null'){
        filter_groupid="AND prod.group_id is null"
    }

    if (subgroup_id !== "" && subgroup_id){
        filter_subgroupid="AND prod.sub_group_id= "+`${subgroup_id}`;
    }
    
    if (subgroup_id == 'null' && subgroup_id){
        filter_subgroupid="AND prod.sub_group_id is null";
    }

    switch (custom1 !== "" && custom1) {
        case custom1:
            filter_custom1="AND prod.custom1= "+`'${custom1}'`;
        break;
    }

    switch (custom2 !== "" && custom2) {
        case custom2:
            filter_custom2="AND prod.custom2= "+`'${custom2}'`;
        break;
    }

    switch (custom3 !== "" && custom3) {
        case custom3:
            filter_custom3="AND prod.custom3= "+`'${custom3}'`;
        break;
    }

    switch (custom4 !== "" && custom4) {
        case custom4:
            filter_custom4="AND prod.custom4= "+`'${custom4}'`;
        break;
    }

    switch (custom5 !== "" && custom5) {
        case custom5:
            filter_custom5="AND prod.custom5= "+`'${custom5}'`;
        break;
    }

    const products = await queryMdProducts(page, mysql, filter_isactive, filter_isinventory, filter_isecommerce, filter_isticket, filter_isaggregate, filter_isfree, filter_iskit, filter_groupid, filter_subgroupid, filter_custom1, filter_custom2, filter_custom3, filter_custom4, filter_custom5, limit, offset)
    let jsonResult = {
        'total_rows': total_elementos,
        'total_page': total_paginas,
        'number_pagination': products.length,
        'page': page,
        'data': products
    }
    return jsonResult;
}

const queryMdProducts = async (page, mysql, filter_isactive, filter_isinventory, filter_isecommerce, filter_isticket, filter_isaggregate, filter_isfree, filter_iskit, filter_groupid, filter_subgroupid, filter_custom1, filter_custom2, filter_custom3, filter_custom4, filter_custom5, limit, offset) => {//Funcion de tipo asincronica, realiza la consulta.
    // consulta de datos con numero de paginas y offset
    const mdproductsQuery = "SELECT prod.id, prod.`code`, prod.barcode, prod.barcode_type, prod.description, prod.description_details, prod.measurement_unit_id, prod.group_id, prod.sub_group_id, prod.price_net, prod.cl_price_net_prod, prod.cl_price_net_logistic, prod.price_brute, prod.is_inventory, prod.is_visiblePOS, prod.is_active, prod.img_one, prod.price_lastpur, prod.stockmax, prod.stockrep, prod.stockmin, prod.custom1, prod.custom2, prod.custom3, prod.custom4, prod.custom5, prod.cost_prom, prod.weight, prod.is_kit, prod.has_kit, prod.is_ticket, prod.is_aggregate, prod.is_ecommerce, prod.print_details, prod.is_recurrent, prod.price_net_uf, prod.is_free, ecoprodi.id, ecoprodi.product_id, ecoprodi.img_one, ecoprodi.img_two, ecoprodi.img_three, ecoprodi.img_four, ecoprodi.img_five, ecoprodi.product_details, ecoprodi.product_details_short FROM products AS prod LEFT OUTER JOIN ecommerce_product_images AS ecoprodi ON prod.id = ecoprodi.product_id WHERE prod.deleted_at is null " + filter_isactive + " " + filter_isinventory + " " + filter_isecommerce + " " + filter_isticket + " " + filter_isaggregate + " " + filter_isfree + " " + filter_iskit + " "+ filter_groupid + " " + filter_subgroupid + " " + filter_custom1 + " " + filter_custom2 + " "+ filter_custom3 + " " + filter_custom4 + " " + filter_custom5 + " LIMIT " + limit + " OFFSET " + offset
    const product = await query(mdproductsQuery, mysql);
    const totalQuery = "SELECT COUNT(*) AS id FROM products AS prod LEFT OUTER JOIN ecommerce_product_images AS ecoprodi ON prod.id = ecoprodi.product_id WHERE prod.deleted_at is null " + filter_isactive + " " + filter_isinventory + " " + filter_isecommerce + " " + filter_isticket + " " + filter_isaggregate + " " + filter_isfree + " " + filter_iskit + " " + filter_groupid + " " + filter_subgroupid + " " + filter_custom1 + " " + filter_custom2+ " " + filter_custom3 + " " + filter_custom4 + " " +filter_custom5
    const total = await query(totalQuery, mysql);

    total_elementos = total[0]['id']
    total_paginas= Math.ceil(total_elementos/100)
    console.log(mdproductsQuery);
    return product;
}

//Deberia ir en helpers
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
    getMdProduct
}