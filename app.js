const express = require('express');
const indexRouter = require('./router/router');
const app = express();

// Parseo del Body de Cada Petición
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

app.use('/api', indexRouter); //<--- (http://localhost/api)

app.listen(3000, () => console.log('Server is running on port 3000')); //<--- Servidor Activo