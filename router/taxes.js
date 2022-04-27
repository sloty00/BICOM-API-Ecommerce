//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllTaxes, Add_Taxes, Put_Taxes } = require('../controllers/taxes')

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
 *                  type: integer
 *                  description: Value taxes
 *              type:
 *                  type: integer
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

/**
 * @swagger
 * /taxes/insert:
 *   post:
 *      summary: Create new Taxes
 *      tags: [Taxes]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  $ref: '#/components/schemas/taxes'
 *      responses:
 *         200:
 *            description: New taxes created!!
 */
router.post('/insert', Add_Taxes);

/**
 * @swagger
 *  /taxes/update/{id_params}:
 *   put: 
 *     sumary: Update Taxes
 *     tags: [Taxes]
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
 *                 $ref: '#/components/schemas/taxes'
 *     responses:  
 *       '200': 
 *         description: Taxes Updated!!
 *       '400':
 *         description: Bad request
 *   
 */
router.put('/update/:id_params', Put_Taxes);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;