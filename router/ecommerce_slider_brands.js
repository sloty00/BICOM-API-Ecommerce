//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllEcommerceBrands } = require('../controllers/ecommerce_slider_brands')

/**
 * @swagger
 * components:
 *  schemas:
 *      ecommerce_slider_brands:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table Credit cards
 *              img_slider:
 *                  type: string
 *                  description: Save link path image slider
 * 
 */

/**
 * @swagger
 *  /ebrands:
 *   get: 
 *     sumary: Get all Ecommerce Slider Brands
 *     tags: [Ecommerce Slider Brands]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All Ecommerce Slider Brands for pages
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */ 

//Rutas.
router.get('/', getAllEcommerceBrands);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;