//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllPosMachines } = require('../controllers/posmachines')

/**
 * @swagger
 * components:
 *  schemas:
 *      posmachines:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table posmachines
 *              code:
 *                  type: string
 *                  description: Code posmachine
 *              description:
 *                  type: string
 *                  description: Description posmachine
 *              mac_address:
 *                  type: integer
 *                  description: physical device mac address
 */

/**
 * @swagger
 *  /posmachines:
 *   get:
 *     sumary: Get all posmachines
 *     tags: [Posmachines]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All posmachines for pages
 *     responses:
 *       200:
 *         description: Success
 *   
 */

//Rutas.
router.get('/', getAllPosMachines);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;