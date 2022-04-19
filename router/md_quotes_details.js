//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllMdQuoteDetail } = require('../controllers/md_quotes_details')

/**
 * @swagger
 * components:
 *  schemas:
 *      MD Quotes Details:
 *          type: object
 *          properties:
 *             id: 
 *                  type: integer
 *                  description: Primary key table products
 *             quotes.id:
 *                  type: integer
 *                  description: ID quotes
 *             quotes.branchoffice_id:
 *                  type: integer
 *                  description: ID Branchoffice
 *             quotes.quote_date:
 *                  type: date
 *                  description: Date register
 *             quotes.customer_supplier_id:
 *                  type: ID
 *                  description: Customer supplier
 *             quotes.customer_supplier_name:
 *                  type: string
 *                  description: Name client
 *             quotes.customer_supplier_activity:
 *                  type: string
 *                  description: Activity Client
 *             quotes.document_type_id:
 *                  type: integer
 *                  description: ID document type
 *             quotes.descriptions:
 *                  type: string
 *                  description: Description quotes
 *             quotes.cost_center_id:
 *                  type: integer
 *                  description: ID Cost Center
 *             quotes.seller_id:
 *                  type: integer
 *                  description: ID Seller
 *             quotes.user_id:
 *                  type: integer
 *                  description: ID user
 *             quotes.payment_type_id:
 *                  type: integer
 *                  description: ID Payment type
 *             quotes.subtotal:
 *                  type: double
 *                  description: Subtotal
 *             quotes.value_discount:
 *                  type: double
 *                  description:
 *             quotes.type_discount:
 *                  type: integer
 *                  description: Type discount
 *             quotes.total_discount:
 *                  type: double
 *                  description: Total discount
 *             quotes.tax:
 *                  type: double
 *                  description: Value of amount VAT
 *             quotes.total_discount_items:
 *                  type: double
 *                  description: Total discount items
 *             quotes.total:
 *                  type: double
 *                  description: Total
 *             quotes.consolidate:
 *                  type: integer
 *                  description: State of document
 *             quotes.is_exempt:
 *                  type: integer
 *                  description: Document exempt or not
 *             quotes.warehouse_id:
 *                  type: integer
 *                  description: ID warehouses
 *             quotes.warehouse_name:
 *                  type: string
 *                  description: Name of warehouses
 *             quotes.warehouse_origin_id:
 *                  type: integer
 *                  description: ID warehouses origin
 *             quotes.warehouse_destination_id:
 *                  type: integer
 *                  description: Warehouses  destination
 *             quotes.state:
 *                  type: string
 *                  description: Document descriptive status
 *             quotes.document_date:
 *                  type: date
 *                  description: date register document
 *             quotes.number_document:
 *                  type: string
 *                  description: Folio of the referenced document
 *             quotes.responsable:
 *                  type: string
 *                  description: Responsible for the entry guide
 *             quotes.reference_id:
 *                  type: integer
 *                  description: ID reference
 *             quotes.reference_cancel_id:
 *                  type: integer
 *                  description: ID reference cancel
 *             quotes.state_send_sii:
 *                  type: integer
 *                  description: Sii shipping status
 *             quotes.state_response_sii:
 *                  type: integer
 *                  description: Sii response status
 *             quotes.payment_type_sii:
 *                  type: integer
 *                  description: Type of payment
 *             quotes.is_sii:
 *                  type: integer
 *                  description: Document electronic or not
 *             quotes.activity_id:
 *                  type: integer
 *                  description: ID activity
 *             quotes.activity_descriptions:
 *                  type: integer
 *                  description: Identifier of the economic activity used in the document
 *             quotes.company_activity_id:
 *                  type: integer
 *                  description: ID activity company
 *             quotes.date_expiration:
 *                  type: date
 *                  description: Document expiration date
 *             quotes.exempt:
 *                  type: double
 *                  description: Value total exempt
 *             quotes.folio:
 *                  type: integer
 *                  description: Number of folio
 *             quotes.total_ila:
 *                  type: Double
 *                  description: Total value of taxes additional
 *             quotes.is_around:
 *                  type: integer
 *                  description: #
 *             quotes.is_shipping:
 *                  type: integer
 *                  description: #
 *             quotes.shipping_service_id:
 *                  type: integer
 *                  description: ID shipping service
 *             quotes.tariff_id:
 *                  type: double
 *                  description: #
 *             quotes.shipping_destination_id:
 *                  type: integer
 *                  description: ID destination Shipping
 *             quotes_details_id:
 *                  type: integer
 *                  description: ID quotes details
 *             quote_details.quote_id:
 *                  type: integer
 *                  description: ID quote details
 *             quote_details.product_id:
 *                  type: integer
 *                  description: ID product detail
 *             quote_details.product_name:
 *                  type: string
 *                  description: Name of product
 *             quote_details.product_weight:
 *                  type: integer
 *                  description: Product weight
 *             quote_details.measurement_unit_id:
 *                  type: integer
 *                  description: ID measurement unit
 *             quote_details.price_net:
 *                  type: double
 *                  description: Net prices
 *             quote_details.price_brute:
 *                  type: double
 *                  description: Brute prices
 *             quote_details.price_cost:
 *                  type: double
 *                  description: Cost Price
 *             quote_details.price_net_new:
 *                  type: double
 *                  description: Mew net price
 *             quote_details.quantity_out_base:
 *                  type: double
 *                  description: #
 *             quote_details.quantity_in_base:
 *                  type: double
 *                  description: #
 *             quote_details.quantity_dispatch_base:
 *                  type: double
 *                  description: #
 *             quote_details.total_tax:
 *                  type: double
 *                  description: Total VAT line
 *             quote_details.product_descriptions:
 *                  type: string
 *                  description: Description product
 *             quote_details.tax_id:
 *                  type: integer
 *                  description: ID tax
 *             quote_details.value_ila:
 *                  type: double
 *                  description: Value in amount tax additional
 */

/**
 * @swagger
 *  /md_quote_details:
 *   get:
 *     sumary: Get all MD quotes details
 *     tags: [MD Quotes Details]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All MD quotes details for pages
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
router.get('/', getAllMdQuoteDetail);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;