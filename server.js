//Declaracion Constantes.
const express = require('express');
require('dotenv').config();
const cors = require("cors");
const app = express();
//const { router } = require('./router/master_detail_movement')

//Usar ciertos esquemas.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use('/api/CRTypes', require('./router/cash_register_types')); //<--- (http://localhost:3000/api/CRTypes?page=1)
app.use('/api/banks', require('./router/banks')); //<--- (http://localhost:3000/api/banks?page=1)
app.use('/api/warehouses', require('./router/warehouses')); //<--- (http://localhost:3000/api/warehouses?page=1)
app.use('/api/ccenters', require('./router/costcenters')); //<--- (http://localhost:3000/api/ccenters?page=1)
app.use('/api/posmachines', require('./router/posmachines')); //<--- (http://localhost:3000/api/posmachines?page=1)
app.use('/api/activities', require('./router/activities')); //<--- (http://localhost:3000/api/activities?page=1)
app.use('/api/subgroups', require('./router/subgroups')); //<--- (http://localhost:3000/api/subgroups?page=1)
app.use('/api/ccards', require('./router/creditcards')); //<--- (http://localhost:3000/api/ccards?page=1)
app.use('/api/sellers', require('./router/sellers')); //<--- (http://localhost:3000/api/sellers?page=1)
app.use('/api/md_inventorys', require('./router/md_inventory')); //<--- (http://localhost:3000/api/md_inventorys?page=1)
app.use('/api/md_movements', require('./router/md_movement')); //<--- (http://localhost:3000/api/md_movements?page=1&doc_type=1)
app.use('/api/md_products', require('./router/md_product')); //<--- (http://localhost:3000/api/md_products?page=1)
app.use('/api/md_ecommp', require('./router/md_ecommerceparams')); //<--- (http://localhost:3000/api/md_ecommp?page=1)

//Ruta de referencia.
app.get('/', function (req, res) {
    res.send('.');
});

//Activacion del servidor.
app.listen(process.env.BC_PORT_SERVER_1, () => {
    console.log(`SERVIDOR CORRIENDO EN PUERTO ${process.env.BC_PORT_SERVER_1}`)
});