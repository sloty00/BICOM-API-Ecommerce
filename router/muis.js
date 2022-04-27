//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllMuis, Add_Munits, Put_Munits } = require('../controllers/muis')

/**
 * @swagger
 * components:
 *  schemas:
 *      measurement_units:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table measurement_units
 *              code:
 *                  type: string
 *                  description: Code measurement_units
 *              description:
 *                  type: string
 *                  description: Description measurement_units
 */

/**
 * @swagger
 *  /muis:
 *   get:
 *     sumary: Get all measurements units
 *     tags: [Measurement Units]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All measurements units for pages
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */

//Rutas.
router.get('/', getAllMuis);

/**
 * @swagger
 * /muis/insert:
 *   post:
 *      summary: Create new Measurement Units
 *      tags: [Measurement Units]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  $ref: '#/components/schemas/measurement_units'
 *      responses:
 *         200:
 *            description: New Measurement Units created!!
 */
router.post('/insert', Add_Munits);

/**
 * @swagger
 *  /muis/update/{id_params}:
 *   put: 
 *     sumary: Update Measurement Units
 *     tags: [Measurement Units]
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
 *                 $ref: '#/components/schemas/measurement_units'
 *     responses:  
 *       '200': 
 *         description: Measurement Units Updated!!
 *       '400':
 *         description: Bad request
 *   
 */
router.put('/update/:id_params', Put_Munits);

//Exportamos las funciones para usar en server.js.
module.exports = router;