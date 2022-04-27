//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllCities, Add_Cities, Put_Cities } = require('../controllers/cities')

/**
 * @swagger
 * components:
 *  schemas:
 *      cities:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table cities
 *              code:
 *                  type: string
 *                  description: Code cities
 *              description:
 *                  type: string
 *                  description: Name cities
 *              region_id:
 *                  type: integer
 *                  description: Number Region
 * */

/**
 * @swagger
 *  /cities:
 *   get: 
 *     sumary: Get all Cities
 *     tags: [Cities]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All Cities for pages
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */ 

//Rutas.
router.get('/', getAllCities);

/**
 * @swagger
 * /cities/insert:
 *   post:
 *      summary: Create new Cities
 *      tags: [Cities]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  $ref: '#/components/schemas/cities'
 *      responses:
 *         200:
 *            description: New Cities created!!
 */
router.post('/insert', Add_Cities);

/**
 * @swagger
 *  /cities/update/{id_params}:
 *   put: 
 *     sumary: Update Cities
 *     tags: [Cities]
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
 *                 $ref: '#/components/schemas/cities'
 *     responses:  
 *       '200': 
 *         description: Cities Updated!!
 *       '400':
 *         description: Bad request
 *   
 */
router.put('/update/:id_params', Put_Cities);
//Exportamos las funciones para usar en server.js.
module.exports = router;