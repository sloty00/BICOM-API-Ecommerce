const express = require('express');
const router = express.Router();
const db = require('../config/dbConnection');


router.get('/', (req, res) => {
    res.send(`Bienvenido a la pagina`);
})

router.get('/productos', (req, res) => {
    // Limite de 100
    const limit = 100
    // Por numero de pagina
    const page = req.query.page
    // Calcula el offset
    const offset = (page - 1) * limit
    //Consulta para obtener datos con numeros de paginas mas el offset
    const prodsQuery = "SELECT * FROM (products INNER JOIN `groups` ON products.id = `groups`.id) INNER JOIN sub_groups ON products.id = sub_groups.id LIMIT  "+limit+" OFFSET "+offset
    db.getConnection(function(err, connection) {
      connection.query(prodsQuery, function (error, results, fields) {
        // Cuando termine con la conexión, suéltela.
        connection.release();
             if (error) throw error;
        // create payload
        var jsonResult = {
          'Conteo de Items ':results.length,
          'Numero Pagina ':page,
          'Productos ':results
        }
        // create response
        var myJsonString = JSON.parse(JSON.stringify(jsonResult));
        res.statusMessage = "Productos por pagina: "+page;
        res.statusCode = 200;
        res.json(myJsonString);
        res.end();
      })
    })
})

module.exports = router;