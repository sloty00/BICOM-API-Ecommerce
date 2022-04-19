//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllMdBimarketDetail } = require('../controllers/md_bimarkets_details')

/**
 * @swagger
 * components:
 *  schemas:
 *      MD Bimarkets Details:
 *          type: object
 *          properties:
 *	            id:
 *                  type: integer
 *                  description: Primary key table
 *	            branchoffice_id:
 *                  type: integer
 *                  description: ID Branchoffice
 *	            code_sii:
 *                  type: string
 *                  description: Code SII
 *	            folio:
 *                  type: integer
 *                  description: Number folio
 *	            invoice_date:
 *                  type: date
 *                  description: Date register
 *	            customer_supplier_id:
 *                  type: integer
 *                  description: ID of Customer_suppliers
 *	            customer_supplier_name:
 *                  type: string
 *                  description: Name of Costumer supplier
 *	            customer_supplier_activity:
 *                  type: string
 *                  description: Activity of Customer supplier
 *	            descriptions:
 *                  type: string
 *                  description: Description of Ticket bimarkets
 *	            seller_id:
 *                  type: integer
 *                  description: ID Seller
 *	            user_id:
 *                  type: integer
 *                  description: ID User
 *	            payment_type_id:
 *                  type: integer
 *                  description: ID type payment
 *	            subtotal:
 *                  type: double
 *                  description: Subtotal
 *	            value_discount:
 *                  type: double
 *                  description: Value of discount
 *	            type_discount:
 *                  type: integer
 *                  description: Type of Discount
 *	            total_discount:
 *                  type: integer
 *                  description: Total Discount
 *	            total_discount_items:
 *                  type: integer
 *                  description: Sum in amount of discounts made to the items
 *	            tax:
 *                  type: double
 *                  description: Value in amount of VAT
 *	            total:
 *                  type: integer
 *                  description: Total
 *	            consolidate:
 *                  type: integer
 *                  description: State of document
 *	            is_exempt:
 *                  type: integer
 *                  description: If is exempt or not
 *	            warehouse_id:
 *                  type: integer
 *                  description: ID of warehouses
 *	            warehouse_name:
 *                  type: string
 *                  description: Name of Warehouses
 *	            cash_register_type_id:
 *                  type: integer
 *                  description: ID of Cash register type
 *	            cash_register_id:
 *                  type: integer
 *                  description: ID of Cash register
 *	            posmachine_id:
 *                  type: integer
 *                  description: ID of posmachine
 *	            state:
 *                  type: string
 *                  description: Detail Status of the movement
 *	            exempt:
 *                  type: double
 *                  description: Total exempt value
 *	            total_ila:
 *                  type: double
 *                  description: total value of taxes additional
 *	            movement_id:
 *                  type: integer
 *                  description: ID of movement
 *	            value_tip:
 *                  type: integer
 *                  description: Tip Value
 *	            invoice_time:
 *                  type: time
 *                  description: broadcast time of document
 *	            is_appmobile:
 *                  type: integer
 *                  description: If the document was made from the mobile app
 *	            reserve_cash_register:
 *                  type: integer
 *                  description: #
 *	            ticket_bimarket_details_id:
 *                  type: integer
 *                  description: ID of Ticket bimarket details
 *	            product_id:
 *                  type: integer
 *                  description: ID of product
 *	            product_name:
 *                  type: string
 *                  description: name of products
 *	            measurement_unit_id:
 *                  type: integer
 *                  description: ID of measurement units
 *	            price_net:
 *                  type: double
 *                  description: Price Net
 *	            price_brute:
 *                  type: double
 *                  description: Price Brute
 *	            quantity_out:
 *                  type: double
 *                  description: Outgoing quantity
 *	            quantity_in:
 *                  type: double
 *                  description: Incoming quantity
 *	            quantity_dispatch:
 *                  type: double
 *                  description: Amount dispatched or delivered
 *	            total_tax:
 *                  type: double
 *                  description: Total VAT of the line
 *	            product_descriptions:
 *                  type: string
 *                  description: Description of products
 *	            kit_id:
 *                  type: integer
 *                  description: ID of Kit
 *	            kit_line:
 *                  type: integer
 *                  description: Identifier of the detail line
 *	            tax_id:
 *                  type: integer
 *                  description: ID of tax
 *	            value_ila:
 *                  type: double
 *                  description: Value in amount of additional tax
 *	            promotion_id:
 *                  type: integer
 *                  description: ID of promotion
 *	            promotion_quantity:
 *                  type: double
 *                  description: Amount of products in the promotion
 *	            promotion_oper:
 *                  type: integer
 *                  description: Type of operation of the promotion 1 = same as 2 = greater than or equal to used at the point selling
 *	            promotion_discount_n:
 *                  type: double
 *                  description: Discount on amount with respect to net price of line
 *	            promotion_discount_b: 
 *                  type: double
 *                  description: Discount on amount with respect to gross price of line
 */

/**
 * @swagger
 *  /md_bimarket_details:
 *   get: 
 *     sumary: Get all MD bimarket-details
 *     tags: [MD Bimarket Details]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All MD bimarket-details for pages
 *       - in: query
 *         name: begin_date
 *         schema:
 *           type: string
 *         description: Begin date format (YYYY-mm-dd)
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *         description: End date format (YYYY-mm-dd)
 *     responses:  
 *       200: 
 *         description: Success
 *   
 */ 

//Rutas.
router.get('/', getAllMdBimarketDetail);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;