//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllMuis } = require('../controllers/muis')

/**
 * @swagger
 * components:
 *  schemas:
 *      measurement_units:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table measurement_units
 *              code:
 *                  type: string
 *                  description: Code measurement_units
 *              description:
 *                  type: string
 *                  description: Description measurement_units
 */

/**
 * @swagger
 *  /muis:
 *   get:
 *     sumary: Get all measurements units
 *     tags: [Measurement Units]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All measurements units for pages
 *     responses:
 *       200:
 *         description: Success
 *   
 */

//Rutas.
router.get('/', getAllMuis);

//Exportamos las funciones para usar en server.js.
module.exports = router;