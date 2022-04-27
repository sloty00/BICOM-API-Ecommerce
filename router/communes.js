//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllCommunes, Add_Communes, Put_Communes } = require('../controllers/communes')

/**
 * @swagger
 * components:
 *  schemas:
 *      communes:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table Communes
 *              code:
 *                  type: integer
 *                  description: Code Communes
 *              description:
 *                  type: string
 *                  description: Name Communes
 *              city_id:
 *                  type: integer
 *                  description: ID Cties
 * 
 */

/**
 * @swagger
 *  /communes:
 *   get: 
 *     sumary: Get all Communes
 *     tags: [Communes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All Communes for pages
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */ 

//Rutas.
router.get('/', getAllCommunes);
router.post('/add', Add_Communes);
router.put('/update/:id_params', Put_Communes);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;