//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllCountries } = require('../controllers/countries')

/**
 * @swagger
 * components:
 *  schemas:
 *      countries:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table Countries
 *              code:
 *                  type: integer
 *                  description: Code Cost Countries
 *              description:
 *                  type: string
 *                  description: Name Cost Countries
 * 
 */

/**
 * @swagger
 *  /countries:
 *   get: 
 *     sumary: Get all Countries
 *     tags: [Countries]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All Countries for pages
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */ 

//Rutas.
router.get('/', getAllCountries);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;