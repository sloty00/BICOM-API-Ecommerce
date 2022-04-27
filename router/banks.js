//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllBanks, Add_Banks, Put_Banks } = require('../controllers/banks')

/**
 * @swagger
 * components:
 *  schemas:
 *      banks:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table banks
 *              code:
 *                  type: string
 *                  description: Code banks
 *              description:
 *                  type: string
 *                  description: Description banks
 */

/**
 * @swagger
 *  /banks:
 *   get: 
 *     sumary: Get all Banks
 *     tags: [Banks]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All Banks for pages
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */ 

//Rutas.
router.get('/', getAllBanks);

/**
 * @swagger
 * /banks/insert:
 *   post:
 *      summary: Create new Banks
 *      tags: [Banks]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  $ref: '#/components/schemas/banks'
 *      responses:
 *         200:
 *            description: New Banks created!!
 */
router.post('/insert', Add_Banks);

/**
 * @swagger
 *  /banks/update/{id_params}:
 *   put: 
 *     sumary: Update Banks
 *     tags: [Banks]
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
 *                 $ref: '#/components/schemas/activities'
 *     responses:  
 *       '200': 
 *         description: Activities Updated!!
 *       '400':
 *         description: Bad request
 *   
 */
router.put('/update/:id_params', Put_Banks);

//Exportamos las funciones para usar en server.js.
module.exports = router;