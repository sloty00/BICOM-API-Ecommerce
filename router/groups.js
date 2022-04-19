//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllGroups } = require('../controllers/groups')

/**
 * @swagger
 * components:
 *  schemas:
 *      groups:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table groups
 *              description:
 *                  type: integer
 *                  description: Description groups
 *              is_ecommerce:
 *                  type: integer
 *                  description: If is ecommerce
 *              is_menu:
 *                  type: integer
 *                  description: If is Menu
 *              img_groups:
 *                  type: string
 *                  description: If is image groups
 * 
 */

/**
 * @swagger
 *  /groups:
 *   get: 
 *     sumary: Get all Groups
 *     tags: [Groups]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All Groups for pages
 *     responses:  
 *       200: 
 *         description: Success
 *   
 */ 

//Rutas.
router.get('/', getAllGroups);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;