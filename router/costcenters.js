//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllCostCenters, Add_CostCenters, Put_CostCenters} = require('../controllers/costcenters');

/**
 * @swagger
 * components:
 *  schemas:
 *      costcenters:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table Cost Centers
 *              code:
 *                  type: string
 *                  description: Code Cost Centers
 *              description:
 *                  type: string
 *                  description: Name Cost Centers
 * 
 */

/**
 * @swagger
 *  /costcenters:
 *   get: 
 *     sumary: Get all Cost Centers
 *     tags: [Cost Centers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All Cost Centers for pages
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */ 

//Rutas.
router.get('/', getAllCostCenters);

/**
 * @swagger
 * /costcenters/insert:
 *   post:
 *      summary: Create new Cost Centers
 *      tags: [Cost Centers]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  $ref: '#/components/schemas/costcenters'
 *      responses:
 *         200:
 *            description: New Cost Centers created!!
 */
router.post('/insert', Add_CostCenters);

/**
 * @swagger
 *  /costcenters/update/{id_params}:
 *   put: 
 *     sumary: Update Cost Centers
 *     tags: [Cost Centers]
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
 *                 $ref: '#/components/schemas/costcenters'
 *     responses:  
 *       '200': 
 *         description: Cost Centers Updated!!
 *       '400':
 *         description: Bad request
 *   
 */
router.put('/update/:id_params', Put_CostCenters);

//Exportamos las funciones para usar en server.js.
module.exports = router;