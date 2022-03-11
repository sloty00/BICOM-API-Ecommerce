const express = require("express");
require('dotenv').config();
const cors = require("cors");
const { dbConnection } = require('./database/config');


const app = express();

// Base de Datos
dbConnection();

// Cors
app.use(cors())

// Directorio Público
app.use( express.static('public') );

// Parseo del Body de Cada Petición
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

app.get('/', function(req, res) {
    res.send('.');
});

// Rutas 
app.use('/api/auth', require('./routes/auth'));



app.listen(process.env.PORT, () => {
    console.log(`SERVIDOR CORRIENDO EN PUERTO ${process.env.PORT}`)
});
