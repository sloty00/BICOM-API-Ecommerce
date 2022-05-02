//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { GetAllProducts, Add_Products, Put_Products } = require('../controllers/products');

/**
 * @swagger
 * components:
 *  schemas:
 *      products:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table products
 *              code:
 *                  type: string
 *                  description: Internal code of the product
 *              barcode:
 *                  type: string
 *                  description: Barcode of the product
 *              barcode_type:
 *                  type: integer
 *                  description: Barcode_type of the products
 *              description:
 *                  type: string
 *                  description: Description products
 *              description_details:
 *                  type: string
 *                  description: Product description, appears in the second invoice line
 *              measurement_unit_id:
 *                  type: integer
 *                  description: unit in which it is measured product (un, kg, lt)
 *              group_id:
 *                  type: integer
 *                  description: Id of the group to which the product belongs
 *              sub_group_id:
 *                  type: integer
 *                  description: Id of the subgroup to which the product belongs
 *              price_net:
 *                  type: integer
 *                  description: Product net price (Tax included)
 *              price_brute:
 *                  type: integer
 *                  description: Product gross price (without taxation)
 *              is_inventory:
 *                  type: integer
 *                  description: Product is inventoriable
 *              is_visiblePOS:
 *                  type: integer
 *                  description: Product is visible in the point of sale
 *              is_active:
 *                  type: integer
 *                  description: Product is active (if is not active does not appear in the system)
 *              img_one:
 *                  type: string
 *                  description: image url product to use in ecommerce and reader prices
 *              price_lastpur:
 *                  type: integer
 *                  description: Price of the last product purchase
 *              stockmax:
 *                  type: integer
 *                  description: Maximun stock of product to activate alamar
 *              stockrep:
 *                  type: integer
 *                  description: Replacement stock of product to activate alarm
 *              stockmin:
 *                  type: integer
 *                  description: Minimun stock of product to activate alarm
 *              measurement_unit_convert_id:
 *                  type: integer
 *                  description: ID measurement unit convert
 *              custom1:
 *                  type: string
 *                  description: Editable field for end user add his own field
 *              custom2:
 *                  type: string
 *                  description: Editable field for end user add his own field
 *              custom3:
 *                  type: string
 *                  description: Editable field for end user add his own field
 *              custom4:
 *                  type: string
 *                  description: Editable field for end user add his own field
 *              custom5:
 *                  type: string
 *                  description: Editable field for end user add his own field
 *              cost_prom:
 *                  type: integer
 *                  description: Average cost of product purchases
 *              weight:
 *                  type: integer
 *                  description: Product weight for calculate shipping cost
 *              is_kit:
 *                  type: integer
 *                  description: Product is product kit
 *              is_ticket:
 *                  type: integer
 *                  description: product works with exchange tickets
 *              is_aggregate:
 *                  type: integer
 *                  description: Product is added, for the module Bigourmet de restaurants
 *              is_ecommerce:
 *                  type: integer
 *                  description: Product appears in the e-commerce
 *              print_details:
 *                  type: integer
 *                  description: If it is a kit product, print this product also on the ballot
 *              price_net_uf:
 *                  type: integer
 *                  description: Product Net Value in UF
 *              is_free:
 *                  type: integer
 *                  description: Is use for bigourmet
 */

/**
 * @swagger
 *  /products:
 *   get:
 *     sumary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All products for pages
 *       - in: query
 *         name: begin_code
 *         schema:
 *           type: integer
 *         description: Internal code of the product (Begin)
 *       - in: query
 *         name: end_code
 *         schema:
 *           type: integer
 *         description: Internal code of the product (Last)
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: integer
 *         description: Product is active = 1 or not = 0
 *       - in: query
 *         name: is_inventory
 *         schema:
 *           type: integer
 *         description: product is inventoriable = 1 or not = 0
 *       - in: query
 *         name: is_ecommerce
 *         schema:
 *           type: integer
 *         description: Product appears in the e-commerce = 1 or not = 0
 *       - in: query
 *         name: is_ticket
 *         schema:
 *           type: integer
 *         description: Product works with exchange tickets = 1 or not 0
 *       - in: query
 *         name: is_aggregate
 *         schema:
 *           type: integer
 *         description: Product is added, for the module Bigourmet de restaurants = 1 or not = 0
 *       - in: query
 *         name: is_free
 *         schema:
 *           type: integer
 *         description: #
 *       - in: query
 *         name: is_kit
 *         schema:
 *           type: integer
 *         description: Products is products kit = 1 or not = 0
 *       - in: query
 *         name: group_id
 *         schema:
 *           type: integer
 *         description: ID of the group
 *       - in: query
 *         name: sub_group_id
 *         schema:
 *           type: integer
 *         description: ID of the subgroup
 *       - in: query
 *         name: custom1
 *         schema:
 *           type: string
 *         description: Field for end user add his own field
 *       - in: query
 *         name: custom2
 *         schema:
 *           type: string
 *         description: Field for end user add his own field
 *       - in: query
 *         name: custom3
 *         schema:
 *           type: string
 *         description: Field for end user add his own field
 *       - in: query
 *         name: custom4
 *         schema:
 *           type: string
 *         description: Field for end user add his own field
 *       - in: query
 *         name: custom5
 *         schema:
 *           type: string
 *         description: Field for end user add his own field
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */

//Rutas.
router.get('/', GetAllProducts);

/**
 * @swagger
 * /products/insert:
 *   post:
 *      summary: Create new Products
 *      tags: [Products]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  $ref: '#/components/schemas/products'
 *      responses:
 *         200:
 *            description: New Products created!!
 */
router.post('/insert', Add_Products);

/**
 * @swagger
 *  /products/update/{id_params}:
 *   put: 
 *     sumary: Update Products
 *     tags: [Products]
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
 *                 $ref: '#/components/schemas/products'
 *     responses:  
 *       '200': 
 *         description: Products Updated!!
 *       '400':
 *         description: Bad request
 *   
 */
router.put('/update/:id_params', Put_Products);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;