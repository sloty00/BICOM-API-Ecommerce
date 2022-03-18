const express = require('express');
require('dotenv').config();
const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', require('./router/products')); //<--- (http://localhost:3000/api/products?page=1)
app.use('/api/customers_sup', require('./router/customers')); //<--- (http://localhost:3000/api/customers_sup?page=1)
app.use('/api/muis', require('./router/muis')); //<--- (http://localhost:3000/api/muis?page=1)
app.use('/api/groups', require('./router/groups')); //<--- (http://localhost:3000/api/groups?page=1)

app.get('/', function (req, res) {
    res.send('.');
});

app.listen(process.env.BC_PORT_SERVER_1, () => {
    console.log(`SERVIDOR CORRIENDO EN PUERTO ${process.env.BC_PORT_SERVER_1}`)
});