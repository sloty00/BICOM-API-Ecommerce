//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllEcommerceBrands, Add_EcommerceBrands, Put_EcommerceBrands } = require('../controllers/ecommerce_slider_brands')

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
 *              slider_img:
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

/**
 * @swagger
 * /ebrands/insert:
 *   post:
 *      summary: Create new Ecommerce Slider Brands
 *      tags: [Ecommerce Slider Brands]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  $ref: '#/components/schemas/ecommerce_slider_brands'
 *      responses:
 *         200:
 *            description: New Ecommerce Slider Brands created!!
 */
router.post('/insert', Add_EcommerceBrands);

/**
 * @swagger
 *  /ebrands/update/{id_params}:
 *   put: 
 *     sumary: Update Ecommerce Slider Brands
 *     tags: [Ecommerce Slider Brands]
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
 *                 $ref: '#/components/schemas/ecommerce_slider_brands'
 *     responses:
 *       '200':
 *         description: Ecommerce Slider Brands Updated!!
 *       '400':
 *         description: Bad request
 *   
 */
router.put('/update/:id_params', Put_EcommerceBrands)

//Exportamos ñas funciones para usar en server.js.
module.exports = router;