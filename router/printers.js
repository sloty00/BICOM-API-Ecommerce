//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllPrinters, Add_Printers, Put_Printers } = require('../controllers/printers')

/**
 * @swagger
 * components:
 *  schemas:
 *      printers:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table printers
 *              description:
 *                  type: string
 *                  description: Description printers
 *              is_active:
 *                  type: integer
 *                  description: Printers is active (if is not active does not appear in the system)
 *              branchoffice_id:
 *                  type: integer
 *                  description: ID of the branch office
 */

/**
 * @swagger
 *  /printers:
 *   get:
 *     sumary: Get all printers
 *     tags: [Printers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All printers for pages
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */

//Rutas.
router.get('/', getAllPrinters);

/**
 * @swagger
 * /printers/insert:
 *   post:
 *      summary: Create new Printers
 *      tags: [Printers]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  $ref: '#/components/schemas/printers'
 *      responses:
 *         200:
 *            description: New Printers created!!
 */
router.post('/insert', Add_Printers);

/**
 * @swagger
 *  /printers/update/{id_params}:
 *   put: 
 *     sumary: Update Printers
 *     tags: [Printers]
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
 *                 $ref: '#/components/schemas/printers'
 *     responses:  
 *       '200': 
 *         description: Printers Updated!!
 *       '400':
 *         description: Bad request
 *   
 */
router.put('/update/:id_params', Put_Printers);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;