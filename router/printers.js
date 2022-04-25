//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllPrinters, AddPrinters } = require('../controllers/printers')

/**
 * @swagger
 * components:
 *  schemas:
 *      printers:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table printers
 *              description:
 *                  type: string
 *                  description: Description printers
 *              is_active:
 *                  type: string
 *                  description: Printers is active (if is not active does not appear in the system)
 *              branchoffice_id:
 *                  type: integer
 *                  description: ID of the branch office
 */

/**
 * @swagger
 *  /printers:
 *   get:
 *     sumary: Get all printers
 *     tags: [Printers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All printers for pages
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */

//Rutas.
router.get('/', getAllPrinters);
router.post('/add', AddPrinters);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;