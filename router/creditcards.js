//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllCreditsCards, AddCreditsCards } = require('../controllers/creditcards')

/**
 * @swagger
 * components:
 *  schemas:
 *      credit_cards:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table Credit cards
 *              code:
 *                  type: integer
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
router.post('/add', AddCreditsCards);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;