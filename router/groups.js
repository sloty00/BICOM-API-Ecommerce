//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllGroups, Add_Groups, Put_Groups } = require('../controllers/groups')

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
 *                  type: string
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
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */ 

//Rutas.
router.get('/', getAllGroups);

/**
 * @swagger
 * /groups/insert:
 *   post:
 *      summary: Create new Groups
 *      tags: [Groups]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  $ref: '#/components/schemas/groups'
 *      responses:
 *         200:
 *            description: New Groups created!!
 */
router.post('/insert', Add_Groups);

/**
 * @swagger
 *  /groups/update/{id_params}:
 *   put: 
 *     sumary: Update Groups
 *     tags: [Groups]
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
 *                 $ref: '#/components/schemas/groups'
 *     responses:  
 *       '200': 
 *         description: Groups Updated!!
 *       '400':
 *         description: Bad request
 *   
 */
router.put('/update/:id_params', Put_Groups);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;