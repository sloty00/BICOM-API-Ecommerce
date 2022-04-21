//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllCities, AddCities } = require('../controllers/cities')

/**
 * @swagger
 * components:
 *  schemas:
 *      cities:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table cities
 *              code:
 *                  type: integer
 *                  description: Code cities
 *              description:
 *                  type: string
 *                  description: Name cities
 *              region_id:
 *                  type: integer
 *                  description: Number Region
 * */

/**
 * @swagger
 *  /cities:
 *   get: 
 *     sumary: Get all Cities
 *     tags: [Cities]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All Cities for pages
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */ 

//Rutas.
router.get('/', getAllCities);
router.post('/add', AddCities);
//Exportamos las funciones para usar en server.js.
module.exports = router;