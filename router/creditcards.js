//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllCreditsCards, Add_Credits, Put_Credits } = require('../controllers/creditcards')

/**
 * @swagger
 * components:
 *  schemas:
 *      creditcards:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table Credit cards
 *              code:
 *                  type: string
 *                  description: Code Cost Credit cards
 *              description:
 *                  type: string
 *                  description: Name Cost Credit cards
 * 
 */

/**
 * @swagger
 *  /creditcards:
 *   get: 
 *     sumary: Get all Credit Cards
 *     tags: [Credit Cards]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All Credit Cards for pages
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */ 

//Rutas.
router.get('/', getAllCreditsCards);

/**
 * @swagger
 * /creditcards/insert:
 *   post:
 *      summary: Create new Credits Cards
 *      tags: [Credit Cards]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  $ref: '#/components/schemas/creditcards'
 *      responses:
 *         200:
 *            description: New Credit Cards created!!
 */
router.post('/insert', Add_Credits);

/**
 * @swagger
 *  /creditcards/update/{id_params}:
 *   put: 
 *     sumary: Update Credit Cards
 *     tags: [Credit Cards]
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
 *                 $ref: '#/components/schemas/creditcards'
 *     responses:  
 *       '200': 
 *         description: Credit Cards Updated!!
 *       '400':
 *         description: Bad request
 *   
 */
router.put('/update/:id_params', Put_Credits);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;