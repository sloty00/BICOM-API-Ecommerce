//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllSellers } = require('../controllers/sellers')

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

//Exportamos ñas funciones para usar en server.js.
module.exports = router;