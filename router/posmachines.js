//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllPosMachines, Add_Posmachines, Put_Posmachines } = require('../controllers/posmachines')

/**
 * @swagger
 * components:
 *  schemas:
 *      posmachines:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Primary key table posmachines
 *              code:
 *                  type: string
 *                  description: Code posmachine
 *              description:
 *                  type: string
 *                  description: Description posmachine
 *              mac_address:
 *                  type: string
 *                  description: physical device mac address
 */

/**
 * @swagger
 *  /posmachines:
 *   get:
 *     sumary: Get all Posmachines
 *     tags: [Posmachines]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All posmachines for pages
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */

//Rutas.
router.get('/', getAllPosMachines);

/**
 * @swagger
 * /posmachines/insert:
 *   post:
 *      summary: Create new Posmachines
 *      tags: [Posmachines]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  $ref: '#/components/schemas/posmachines'
 *      responses:
 *         200:
 *            description: New Posmachines created!!
 */
router.post('/insert', Add_Posmachines);

/**
 * @swagger
 *  /posmachines/update/{id_params}:
 *   put: 
 *     sumary: Update Posmachines
 *     tags: [Posmachines]
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
 *                 $ref: '#/components/schemas/posmachines'
 *     responses:  
 *       '200': 
 *         description: Posmachines Updated!!
 *       '400':
 *         description: Bad request
 *   
 */
router.put('/update/:id_params', Put_Posmachines);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;