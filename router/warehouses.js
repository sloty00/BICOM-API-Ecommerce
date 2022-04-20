//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllWarehouses } = require('../controllers/warehouses')

/**
 * @swagger
 * components:
 *  schemas:
 *      warehouses:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table warehouses
 *              description:
 *                  type: string
 *                  description: Description warehouses
 *              address:
 *                  type: string
 *                  description: Address warehouses
 *              is_ecommerce:
 *                  type: integer
 *                  description: Is warehouses ecommerce
 */

/**
 * @swagger
 *  /warehouses:
 *   get:
 *     sumary: Get all warehouses
 *     tags: [Warehouses]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All warehouses for pages
 *     responses:
 *       200:
 *         description: Success
 *   
 */

//Rutas.
router.get('/', getAllWarehouses);

//Exportamos las funciones para usar en server.js.
module.exports = router;