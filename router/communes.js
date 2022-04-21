//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllCommunes, AddCommunes } = require('../controllers/communes')

/**
 * @swagger
 * components:
 *  schemas:
 *      communes:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table Communes
 *              code:
 *                  type: integer
 *                  description: Code Communes
 *              description:
 *                  type: string
 *                  description: Name Communes
 *              city_id:
 *                  type: integer
 *                  description: ID Cties
 * 
 */

/**
 * @swagger
 *  /communes:
 *   get: 
 *     sumary: Get all Communes
 *     tags: [Communes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All Communes for pages
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */ 

//Rutas.
router.get('/', getAllCommunes);
router.post('/add', AddCommunes);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;