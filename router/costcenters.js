//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllCostCenters, Add_CostCenters, Put_CostCenters} = require('../controllers/costcenters');

/**
 * @swagger
 * components:
 *  schemas:
 *      cost_centers:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table Cost Centers
 *              code:
 *                  type: integer
 *                  description: Code Cost Centers
 *              description:
 *                  type: string
 *                  description: Name Cost Centers
 * 
 */

/**
 * @swagger
 *  /costcenters:
 *   get: 
 *     sumary: Get all Cost Centers
 *     tags: [Cost Centers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All Cost Centers for pages
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */ 

//Rutas.
router.get('/', getAllCostCenters);
router.post('/add', Add_CostCenters);
router.put('/update/:id_params', Put_CostCenters);

//Exportamos las funciones para usar en server.js.
module.exports = router;