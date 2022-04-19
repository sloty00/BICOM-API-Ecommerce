//Declaracion Constantes.
const express = require('express');
require('dotenv').config();
const cors = require("cors");
const app = express();
//const { router } = require('./router/master_detail_movement')

//swagger
const swaggerUI = require('swagger-ui-express');
const swaggerjsDoc = require('swagger-jsdoc');
const path = require("path");
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node API Ecommerce Bicom",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:3000/api",
            },
        ],
    },
    apis: [`${path.join(__dirname, "./router/*.js")}`],
    
};

//Usar ciertos esquemas.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//swagger
app.use("/api-doc", 
swaggerUI.serve, 
swaggerUI.setup(swaggerjsDoc(swaggerSpec)))

//Llamada a las rutas.
app.use('/api/products', require('./router/products')); //<--- (http://localhost:3000/api/products?page=1)
app.use('/api/customers_sup', require('./router/customers')); //<--- (http://localhost:3000/api/customers_sup?page=1)
app.use('/api/muis', require('./router/muis')); //<--- (http://localhost:3000/api/muis?page=1)
app.use('/api/groups', require('./router/groups')); //<--- (http://localhost:3000/api/groups?page=1)
app.use('/api/countries', require('./router/countries')); //<--- (http://localhost:3000/api/countries?page=1)
app.use('/api/regions', require('./router/regions')); //<--- (http://localhost:3000/api/regions?page=1)
app.use('/api/communes', require('./router/communes')); //<--- (http://localhost:3000/api/communes?page=1)
app.use('/api/taxes', require('./router/taxes')); //<--- (http://localhost:3000/api/taxes?page=1)
app.use('/api/cities', require('./router/cities')); //<--- (http://localhost:3000/api/cities?page=1)
app.use('/api/printers', require('./router/printers')); //<--- (http://localhost:3000/api/printers?page=1)
app.use('/api/cash_register_types', require('./router/cash_register_types')); //<--- (http://localhost:3000/api/cash_register_types?page=1)
app.use('/api/banks', require('./router/banks')); //<--- (http://localhost:3000/api/banks?page=1)
app.use('/api/warehouses', require('./router/warehouses')); //<--- (http://localhost:3000/api/warehouses?page=1)
app.use('/api/costcenters', require('./router/costcenters')); //<--- (http://localhost:3000/api/costcenters?page=1)
app.use('/api/posmachines', require('./router/posmachines')); //<--- (http://localhost:3000/api/posmachines?page=1)
app.use('/api/activities', require('./router/activities')); //<--- (http://localhost:3000/api/activities?page=1)
app.use('/api/subgroups', require('./router/subgroups')); //<--- (http://localhost:3000/api/subgroups?page=1)
app.use('/api/creditcards', require('./router/creditcards')); //<--- (http://localhost:3000/api/creditcards?page=1)
app.use('/api/sellers', require('./router/sellers')); //<--- (http://localhost:3000/api/sellers?page=1)
app.use('/api/md_inventories', require('./router/md_inventories_details')); //<--- (http://localhost:3000/api/md_inventories?page=1)
app.use('/api/md_movements', require('./router/md_movements_details')); //<--- (http://localhost:3000/api/md_movements?page=1&doc_type=1)
app.use('/api/md_products', require('./router/md_products_ecommerces')); //<--- (http://localhost:3000/api/md_products?page=1)
app.use('/api/md_ecom_sellers_warehouses', require('./router/md_ecommerce_sellers_warehouses')); //<--- (http://localhost:3000/api/md_ecom_sellers_warehouses?page=1)
app.use('/api/ebrands', require('./router/ecommerce_slider_brands')); //<--- (http://localhost:3000/api/ebrands?page=1)
app.use('/api/md_ecom_images', require('./router/md_ecomslider_groups')); //<--- (http://localhost:3000/api/md_ecom_images?page=1)
app.use('/api/md_ecom_shipping', require('./router/md_ecommerce_shipping')); //<--- (http://localhost:3000/api/md_ecom_shipping?page=1)
app.use('/api/md_prod_taxes', require('./router/md_products_taxes')); //<--- (http://localhost:3000/api/md_prod_taxes?page=1)
app.use('/api/md_list_price_prod', require('./router/md_listprices_products')); //<--- (http://localhost:3000/api/md_list_price_prod?page=1)
app.use('/api/md_trans_branchoffices', require('./router/md_transbank_branchoffices')); //<--- (http://localhost:3000/api/md_trans_branchoffices?page=1)
app.use('/api/md_bimarket_details', require('./router/md_bimarkets_details')); //<--- (http://localhost:3000/api/md_bimarket_details?page=1)
app.use('/api/md_quote_details', require('./router/md_quotes_details')); //<--- (http://localhost:3000/api/md_quote_details?page=1)
app.use('/api/md_products_stock', require('./router/md_products_stock')); //<--- (http://localhost:3000/api/md_products_stock?page=1)

//Ruta de referencia.
app.get('/', function (req, res) {
    res.send('.');
});

//Activacion del servidor.
app.listen(process.env.BC_PORT_SERVER_1, () => {
    console.log(`SERVIDOR CORRIENDO EN PUERTO ${process.env.BC_PORT_SERVER_1}`)
});