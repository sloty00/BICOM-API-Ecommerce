//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllSellers, Add_Sellers, Put_Sellers } = require('../controllers/sellers')

/**
 * @swagger
 * components:
 *  schemas:
 *      sellers:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table sellers
 *              description:
 *                  type: string
 *                  description: Description Sellers
 *              user_id:
 *                  type: integer
 *                  description: ID User Sellers
 */

/**
 * @swagger
 *  /sellers:
 *   get:
 *     sumary: Get all sellers
 *     tags: [Sellers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All sellers for pages
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */

//Rutas.
router.get('/', getAllSellers);

/**
 * @swagger
 * /sellers/insert:
 *   post:
 *      summary: Create new Sellers
 *      tags: [Sellers]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  $ref: '#/components/schemas/sellers'
 *      responses:
 *         200:
 *            description: New Sellers created!!
 */
router.post('/insert', Add_Sellers);

/**
 * @swagger
 *  /sellers/update/{id_params}:
 *   put: 
 *     sumary: Update Sellers
 *     tags: [Sellers]
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
 *                 $ref: '#/components/schemas/sellers'
 *     responses:  
 *       '200': 
 *         description: Sellers Updated!!
 *       '400':
 *         description: Bad request
 *   
 */
router.put('/update/:id_params', Put_Sellers);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;