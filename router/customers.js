//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllCustomers } = require('../controllers/customers')

/**
 * 
 * components:
 *  schemas:
 *      customers:
 *          type: object
 *          properties:
 *	            id:
 *                  type: integer
 *                  description: Primary key table Credit cards
 *	            rut:
 *                  type: string
 *                  description: ID Rut
 *	            fantasy_name:
 *                  type: string
 *                  description: Fantasy Name Bussiness
 *	            business_name:
 *                  type: integer
 *                  description: Name Bussiness
 *	            activity_id:
 *                  type: integer
 *                  description: ID activities
 *	            country_id:
 *                  type: integer
 *                  description: ID Countries
 *	            region_id:
 *                  type: integer
 *                  description: ID Region
 *	            city_id:
 *                  type: integer
 *                  description: ID Cities
 *	            commune_id:
 *                  type: integer
 *                  description: ID Commune
 *	            address:
 *                  type: integer
 *                  description: Address Customer Supplier
 *	            email:
 *                  type: integer
 *                  description: Email Customer Supplier
 *	            website:
 *                  type: integer
 *                  description: Website Customer Supplier
 *	            is_customer:
 *                  type: integer
 *                  description: If is Customers
 *	            is_supplier:
 *                  type: integer
 *                  description: If is supplier
 *	            is_active:
 *                  type: integer
 *                  description: If is Active
 *	            phone:
 *                  type: integer
 *                  description: Phone Customer Supplier
 *	            phone_two:
 *                  type: integer
 *                  description: Second Phone Customer Supplier
 *	            seller_id:
 *                  type: integer
 *                  description: ID Seller
 *	            list_price_id:
 *                  type: integer
 *                  description: ID List Price
 *	            expired_days:
 *                  type: integer
 *                  description: Expired Days
 *	            limit_amount:
 *                  type: integer
 *                  description: 
 *	            is_customer_simple:
 *                  type: integer
 *                  description: If is Customer Cimple
 *	            can_invoice:
 *                  type: integer
 *                  description: If can Invoice
 *	            can_ballot:
 *                  type: integer
 *                  description: If can Ballot
 *	            can_no_ballot:
 *                  type: integer
 *                  description: If cant Ballot
 *                
 *
 * 
 */

/**
 * @swagger
 *  /customers_sup:
 *   get: 
 *     sumary: Get all Activities
 *     tags: [Customers Suppliers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All Customers for pages
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: integer
 *         description: Product is active = 1 or not = 0
 *       - in: query
 *         name: is_customers
 *         schema:
 *           type: integer
 *         description: The bussiness is client = 1 or not = 0
 *       - in: query
 *         name: is_suppliers
 *         schema:
 *           type: integer
 *         description: The bussiness is suppliers = 1 or not = 0
 *       - in: query
 *         name: region_id
 *         schema:
 *           type: integer
 *         description: Number id region belongs to the city
 *       - in: query
 *         name: city_id
 *         schema:
 *           type: integer
 *         description: Number id to the city
 *       - in: query
 *         name: communes_id
 *         schema:
 *           type: integer
 *         description: Number id to the communes
 *       - in: query
 *         name: activity_id
 *         schema:
 *           type: integer
 *         description: Number id to the activity
 *     responses:  
 *       200: 
 *         description: Success
 *   
 */ 

//Rutas.
router.get('/', getAllCustomers);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;