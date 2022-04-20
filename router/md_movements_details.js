//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllMdMovement } = require('../controllers/md_movements_details')

/**
 * @swagger
 * components:
 *  schemas:
 *      MD Movements Details:
 *          type: object
 *          properties:
 *	           id:
 *                type: integer
 *                description: ID of movements
 *	           branchoffice_id:
 *                type: integer
 *                description: ID of branchoffice
 *	           code_sii:
 *                type: string
 *                description: code document SII
 *	           folio:
 *                type: integer
 *                description: Number of folio
 *	           concept_code:
 *                type: string
 *                description: code concept
 *	           concept_id:
 *                type: integer
 *                description: code concept ID
 *	           invoice_date:
 *                type: date
 *                description: date of register
 *	           customer_supplier_id:
 *                type: integer
 *                description: customer supplier ID
 *	           customer_supplier_name:
 *                type: string
 *                description: #
 *	           customer_supplier_activity:
 *                type: string
 *                description: activity client
 *	           document_type_id:
 *                type: integer
 *                description: document type ID
 *	           descriptions:
 *                type: string
 *                description: description movement ID
 *	           cost_center_id:
 *                type: integer
 *                description: cost center ID
 *	           seller_id:
 *                type: integer
 *                description: Seller ID
 *	           user_id:
 *                type: integer
 *                description: User ID
 *	           payment_type_id:
 *                type: integer
 *                description: Type document ID
 *	           subtotal:
 *                type: double
 *                description: subtotal movement
 *	           value_discount:
 *                type: double
 *                description: value of discount
 *	           type_discount:
 *                type: integer
 *                description: type of discount
 *	           total_discount:
 *                type: double
 *                description: total of discount
 *	           total_discount_items:
 *                type: Double
 *                description: Sum in amount of the discounts made to the items tax Double value in
 *	           tax:
 *                type: string
 *                description: Value of amount VAT
 *	           total:
 *                type: doouble
 *                description: total movement
 *	           consolidate:
 *                type: integer
 *                description: State of document
 *	           is_exempt:
 *                type: integer
 *                description: Document exempt or not
 *	           warehouse_id:
 *                type: integer
 *                description: Waarehouse ID
 *	           warehouse_name:
 *                type: string
 *                description: Name of warehouses
 *	           warehouse_origin_id:
 *                type: integer
 *                description: ID warehouse origin
 *	           warehouse_destination_id:
 *                type: integer
 *                description: ID warehouse destiny
 *	           cash_register_type_id:
 *                type: integer
 *                description: ID register type
 *	           cash_register_id:
 *                type: integer
 *                description: iD cash register
 *	           posmachine_id:
 *                type: integer
 *                description: ID posmachine
 *	           state:
 *                type: string
 *                description: State movement
 *	           document_date:
 *                type: date
 *                description: date register document
 *	           number_document:
 *                type: integer
 *                description: Number of document
 *	           responsable:
 *                type: string
 *                description: #
 *	           reference_id:
 *                type: integer
 *                description: ID reference movement
 *	           reference_cancel_id:
 *                type: integer
 *                description: ID reference movement cancel
 *	           state_send_sii:
 *                type: integer
 *                description: state of shipping SII
 *	           state_response_sii:
 *                type: integer
 *                description: State response SII
 *	           payment_type_sii:
 *                type: integer
 *                description: Payment type SII
 *	           cod_referencia_sii:
 *                type: integer
 *                description: Code reference SII
 *	           type_dispatch_sii:
 *                type: integer
 *                description: type of dispatch SII
 *	           index_dispatch_sii:
 *                type: integer
 *                description: Use guide dispatch electronic document
 *	           autoguide:
 *                type: integer
 *                description: #
 *	           is_sii:
 *                type: integer
 *                description: document electronic or not
 *	           activity_id:
 *                type: integer
 *                description: ID activity
 *	           activity_descriptions:
 *                type: string
 *                description: Description of Activity
 *	           company_activity_id:
 *                type: integer
 *                description: ID company activity
 *	           date_expiration:
 *                type: date
 *                description: Date of expiration
 *	           exempt:
 *                type: double
 *                description: Total value exempt
 *	           total_ila:
 *                type: double
 *                description: Total value taxes additional
 *	           ticket_id:
 *                type: integer
 *                description: ID ticket
 *	           value_tip:
 *                type: dpuble
 *                description: value of tip
 *	           invoice_time:
 *                type: time
 *                description: Hour register document
 *	           is_receptor:
 *                type: integer
 *                description: if he is a receiver or not
 *	           is_contribuyente:
 *                type: integer
 *                description: The issuing taxpayer will be in charge of withholding the current percentage of the Monthly Provisional Payment.
 *	           tax_value_bh:
 *                type: double
 *                description: Retention value of the fee ticket
 *	           is_ecommerce:
 *                type: integer
 *                description: If the document was made from the Ecommerce
 *	           state_ecommerce:
 *                type: integer
 *                description: Field used in Ecommerce
 *	           phone_ecommerce:
 *                type: integer
 *                description: Field used in Ecommerce
 *	           address_ecommerce:
 *                type: string
 *                description: Field used in Ecommerce
 *	           payment_method_ecommerce:
 *                type: integer
 *                description: Field used in Ecommerce
 *	           desired_date_ecommerce:
 *                type: date
 *                description: Field used in Ecommerce
 *	           delivery_ecommerce:
 *                type: integer
 *                description: Field used in Ecommerce
 *	           is_appmobile:
 *                type: integer
 *                description: If the document was made from the mobile App
 *	           surcharge_value:
 *                type: double
 *                description: Field for cost logistic
 *	           detail_id:
 *                type: integer
 *                description: ID movement detail
 *	           product_id:
 *                type: integer
 *                description: ID product
 *	           product_name:
 *                type: string
 *                description: Name of product
 *	           measurement_unit_id:
 *                type: integer
 *                description: ID measurement unit
 *	           price_net:
 *                type: double
 *                description: Net price
 *	           price_brute:
 *                type: double
 *                description: Brute price
 *	           quantity_out:
 *                type: double
 *                description: Quantity out
 *	           quantity_in:
 *                type: double
 *                description: Quantity in
 *	           quantity_dispatch:
 *                type: double
 *                description: Dispatch quantity
 *	           detail_tax:
 *                type: double
 *                description: Total VAT of the line
 *	           consolidated:
 *                type: integer
 *                description: State of document
 *	           detail_total:
 *                type: double
 *                description: Total detail
 *	           product_descriptions:
 *                type: string
 *                description: Descriptions of products
 *	           kit_id:
 *                type: integer
 *                description: ID of product kit
 *	           kit_line:
 *                type: integer
 *                description: ID of line detail
 *	           tax_id:
 *                type: integer
 *                description: ID tax
 *	           value_ila:
 *                type: double
 *                description: Value in amount of tax additional
 *	           promotion_id:
 *                type: integer
 *                description: ID promotion
 *	           promotion_quantity:
 *                type: double
 *                description: Quantity promotion
 *	           promotion_oper:
 *                type: integer
 *                description: Type of operation of the promotion
 *	           promotion_discount_n:
 *                type: double
 *                description: Discount in amount with respect to the net price of the line
 *	           promotion_discount_b:
 *                type: double
 *                description: Discount in amount with respect to the net price of the line
 */

/**
 * @swagger
 *  /md_movements:
 *   get:
 *     sumary: Get all MD movements details
 *     tags: [MD Movements Details]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All MD movements details for pages
 *       - in: query
 *         name: doc_type
 *         schema:
 *           type: integer
 *         description: Type of document
 *       - in: query
 *         name: is_sii
 *         schema:
 *           type: integer
 *         description: Electronic Document = 1, Not Electronic = 0
 *       - in: query
 *         name: consolidate
 *         schema:
 *           type: integer
 *         description: State of Document, Pendiente = 0, Procesado = 1, Anulado = 2
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
router.get('/', getAllMdMovement);

//Exportamos las funciones para usar en server.js.
module.exports = router