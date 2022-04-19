//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllRegions } = require('../controllers/regions')

/**
 * @swagger
 * components:
 *  schemas:
 *      regions:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table regions
 *              code:
 *                  type: string
 *                  description: Code regions
 *              description:
 *                  type: string
 *                  description: Description regions
 *              country_id:
 *                  type: integer
 *                  description: ID Country regions
 */

/**
 * @swagger
 *  /regions:
 *   get:
 *     sumary: Get all Regions
 *     tags: [Regions]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All Regions for pages
 *     responses:
 *       200:
 *         description: Success
 *   
 */

//Rutas.
router.get('/', getAllRegions);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;