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

/**
 * @swagger
 * /activities/insert:
 *   post:
 *      summary: Create new Activities
 *      tags: [Activities]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  $ref: '#/components/schemas/activities'
 *      responses:
 *         200:
 *            description: New Activities created!!
 */
router.post('/insert', Add_Activities );

/**
 * @swagger
 *  /activities/update/{id_params}:
 *   put: 
 *     sumary: Update Activities
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id_params
 *         schema:
 *           type: integer
 *         required: true
 *         description: Actualiza Datos
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 $ref: '#/components/schemas/activities'
 *     responses:  
 *       '200': 
 *         description: Activities Updated!!
 *       '400':
 *         description: Bad request
 *   
 */
router.put('/update/:id_params', Put_Activities);

//Exportamos las funciones para usar en server.js.
module.exports = router;