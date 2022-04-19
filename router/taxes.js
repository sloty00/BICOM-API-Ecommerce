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
 *                  description: Primary key table warehouses
 *              code:
 *                  type: string
 *                  description: Code warehouses
 *              description:
 *                  type: string
 *                  description: Address warehouses
 *              value:
 *                  type: double
 *                  description: Is warehouses
 *              type:
 *                  type: string
 *                  description: Is warehouses
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
 *       200:
 *         description: Success
 *   
 */

//Rutas.
router.get('/', getAllTaxes);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;