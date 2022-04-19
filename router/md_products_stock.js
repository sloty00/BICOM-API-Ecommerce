//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllProductsStock } = require('../controllers/md_products_stock')

/**
 * @swagger
 * components:
 *  schemas:
 *      MD Products Stock:
 *          type: object
 *          properties:
 *              products_id: 
 *                  type: integer
 *                  description: Primary key table Products Stock
 *              description:
 *                  type: string
 *                  description: Products description
 *              warehouses_description:
 *                  type: string
 *                  description: Warehouses description
 *              stock:
 *                  type: string
 *                  description: Quantity products stock for warehouses
 * 
 */

/**
 * @swagger
 *  /md_products_stock:
 *   get: 
 *     sumary: Get all Products Stock
 *     tags: [MD Products Stock]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All Products Stock for pages
 *     responses:  
 *       200: 
 *         description: Success
 *   
 */ 

//Rutas.
router.get('/', getAllProductsStock);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;