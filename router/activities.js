//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllActivities, Add_Activities, Put_Activities } = require('../controllers/activities')

/**
 * @swagger
 * components:
 *  schemas:
 *      activities:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table activities
 *              code:
 *                  type: string
 *                  description: Code activities
 *              description:
 *                  type: string
 *                  description: Description activities
 */

/**
 * @swagger
 *  /activities:
 *   get: 
 *     sumary: Get all Activities for Page
 *     tags: [Activities]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All Activities for Page
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */

//Rutas.
router.get('/', getAllActivities);
router.post('/insert', Add_Activities );
router.put('/update/:id_params', Put_Activities);

//Exportamos las funciones para usar en server.js.
module.exports = router;