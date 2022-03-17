const db = require('../config/dbConnection');

exports.getAllProducts = (req, res) => {
    // limite de 100
    const limit = 100
    // numeros paginas
    const page = req.query.page
    // calcula offset
    const offset = (page - 1) * limit
    // consulta de datos con numero de paginas y offset
    const prodsQuery = "select * from products limit "+limit+" OFFSET "+offset
    db.getConnection(function(err, connection) {
      connection.query(prodsQuery, function (error, results, fields) {
        // cuando se establece conexion la libera.
        connection.release();
             if (error) throw error;
        // crea el payload
        var jsonResult = {
          'numero elementos':results.length,
          'numero paginas':page,
          'productos':results
        }
        // crea el response
        res.statusCode = 200;
        res.json(jsonResult);
        res.end();
      })
    })
};