const express = require('express');
const ProductRouter = require('./router/products.js');
const CustomersRouter = require('./router/customers');
const GroupsRouter = require('./router/groups.js');
const MuisRouter = require('./router/muis.js');
require('dotenv').config();
const cors = require("cors");
const app = express();
app.use(cors());

// Parseo del Body de Cada Petición
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

app.use('/api', ProductRouter); //<--- (http://localhost/api)
app.use('/api', CustomersRouter); //<--- (http://localhost/api)
app.use('/api', GroupsRouter); //<--- (http://localhost/api)
app.use('/api', MuisRouter); //<--- (http://localhost/api)

app.get('/', function(req, res) {
    res.send('.');
});

app.listen(process.env.BC_PORT_SERVER_1, () => {
    console.log(`SERVIDOR CORRIENDO EN PUERTO ${process.env.BC_PORT_SERVER_1}`)
});