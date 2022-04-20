//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllTaxes } = require('../controllers/taxes')

/**
 * @swagger
 * components:
 *  schemas:
 *      taxes:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table taxes
 *              code:
 *                  type: string
 *                  description: Code taxes
 *              description:
 *                  type: string
 *                  description: Description taxes
 *              value:
 *                  type: double
 *                  description: Value taxes
 *              type:
 *                  type: string
 *                  description: Type taxes
 */

/**
 * @swagger
 *  /taxes:
 *   get:
 *     sumary: Get all taxes
 *     tags: [Taxes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All taxes for pages
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */

//Rutas.
router.get('/', getAllTaxes);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;