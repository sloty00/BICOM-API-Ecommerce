//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllSubgroups, Add_Subgroups, Put_Subgroups } = require('../controllers/subgroups')

/**
 * @swagger
 * components:
 *  schemas:
 *      sub_groups:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table sub_groups
 *              description:
 *                  type: string
 *                  description: Address sub_groups
 *              group_id:
 *                  type: integer
 *                  description: Is sub_groups
 */

/**
 * @swagger
 *  /subgroups:
 *   get:
 *     sumary: Get all subgroups
 *     tags: [Subgroups]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All subgroups for pages
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */

//Rutas.
router.get('/', getAllSubgroups);
router.post('/add', Add_Subgroups);
router.put('/update/:id_params', Put_Subgroups);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;