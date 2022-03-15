const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./router/router');

const app = express();

app.use('/api', indexRouter); //<--- (http://localhost/api)

app.listen(3000, () => console.log('Server is running on port 3000')); //<--- Servidor Activo