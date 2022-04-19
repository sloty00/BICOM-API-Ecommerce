//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllMdListprice } = require('../controllers/md_listprices_products')

/**
 * @swagger
 * components:
 *  schemas:
 *      MD ListPrices Products :
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table products
 *              description:
 *                  type: string
 *                  description: Description of listprices products
 *              formula:
 *                  type: string
 *                  description: Percentage of increase or discount according to the operation
 *              date_ini:
 *                  type: date
 *                  description: Date as of which starts to apply the list prices
 *              date_end:
 *                  type: date
 *                  description: Date up to which apply the list prices
 *              operation:
 *                  type: integer
 *                  description: Control over direct income, increase and discount
 *              is_ecommerce:
 *                  type: integer
 *                  description: Use the list of prices in the e-commerce
 *              list_price_products_id:
 *                  type: integer
 *                  description: ID in listprice product
 *              list_price_id:
 *                  type: integer
 *                  description: ID in listprice
 *              product_id:
 *                  type: integer
 *                  description: ID in product
 *              price_brute:
 *                  type: double
 *                  description: Price Brute
 *              price_net:
 *                  type: double
 *                  description: Price Neto
 */

/**
 * @swagger
 *  /md_list_price_prod:
 *   get:
 *     sumary: Get all MD list prices products
 *     tags: [MD ListPrices Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All MD list prices products for pages
 *     responses:
 *       200:
 *         description: Success
 *   
 */

//Rutas.
router.get('/', getAllMdListprice);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;