//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllWarehouses, Add_Warehouses, Put_Warehouses } = require('../controllers/warehouses')

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
 *              code: 
 *                  type: string
 *                  description: Code warehouses
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
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */

//Rutas.
router.get('/', getAllWarehouses);

/**
 * @swagger
 * /warehouses/insert:
 *   post:
 *      summary: Create new Warehouses
 *      tags: [Warehouses]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  $ref: '#/components/schemas/warehouses'
 *      responses:
 *         200:
 *            description: New Warehouses created!!
 */
router.post('/insert', Add_Warehouses);

/**
 * @swagger
 *  /warehouses/update/{id_params}:
 *   put: 
 *     sumary: Update Warehouses
 *     tags: [Warehouses]
 *     parameters:
 *       - in: path
 *         name: id_params
 *         schema:
 *           type: integer
 *         required: true
 *         description: Update Data
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 $ref: '#/components/schemas/warehouses'
 *     responses:  
 *       '200': 
 *         description: Warehouses Updated!!
 *       '400':
 *         description: Bad request
 *   
 */
router.put('/update/:id_params', Put_Warehouses);

//Exportamos las funciones para usar en server.js.
module.exports = router;