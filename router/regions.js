//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllRegions, Add_Regions, Put_Regions } = require('../controllers/regions')

/**
 * @swagger
 * components:
 *  schemas:
 *      regions:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table regions
 *              code:
 *                  type: string
 *                  description: Code regions
 *              description:
 *                  type: string
 *                  description: Description regions
 *              country_id:
 *                  type: integer
 *                  description: ID Country regions
 */

/**
 * @swagger
 *  /regions:
 *   get:
 *     sumary: Get all Regions
 *     tags: [Regions]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All Regions for pages
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */

//Rutas.
router.get('/', getAllRegions);

/**
 * @swagger
 * /regions/insert:
 *   post:
 *      summary: Create new Regions
 *      tags: [Regions]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  $ref: '#/components/schemas/regions'
 *      responses:
 *         200:
 *            description: New Regions created!!
 */
router.post('/insert', Add_Regions);

/**
 * @swagger
 *  /regions/update/{id_params}:
 *   put: 
 *     sumary: Update Regions
 *     tags: [Regions]
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
 *                 $ref: '#/components/schemas/regions'
 *     responses:  
 *       '200': 
 *         description: Regions Updated!!
 *       '400':
 *         description: Bad request
 *   
 */
router.put('/update/:id_params', Put_Regions);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;