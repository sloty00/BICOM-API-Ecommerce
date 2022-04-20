//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllMdProductTaxes } = require('../controllers/md_products_taxes')

/**
 * @swagger
 * components:
 *  schemas:
 *      MD Products Taxes:
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
 *                  type: double
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
 *                  type: double
 *                  description: Product Net Value in UF
 *              is_free:
 *                  type: integer
 *                  description: Is use for bigourmet
 * 
 *              product_taxes_id:
 *                  type: integer
 *                  description: ID products taxes
 *              taxes_id:
 *                  type: integer
 *                  description: ID Taxes
 *              type:
 *                  type: string
 *                  description: Type of taxes
 *              value:
 *                  type: double
 *                  description: Percentage in which affects the tax price of a product
 */

/**
 * @swagger
 *  /md_prod_taxes:
 *   get:
 *     sumary: Get all MD products taxes
 *     tags: [MD Products Taxes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All MD products taxes for pages
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */

//Rutas.
router.get('/', getAllMdProductTaxes);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;