//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllMdInventories } = require('../controllers/md_inventories_details')

/**
 * @swagger
 * components:
 *  schemas:
 *      MD Inventories Details:
 *          type: object
 *          properties:
 *             id:
 *                  type: integer
 *                  description: Primary key table inventories
 *             branchoffice_id:
 *                  type: integer
 *                  description: ID Branchoffice
 *             invoice_date:
 *                  type: date
 *                  description: Date of register
 *             descriptions:
 *                  type: string
 *                  description: Description inventories
 *             cost_center_id:
 *                  type: integer
 *                  description: ID Cost Center
 *             consolidate:
 *                  type: integer
 *                  description: State of Document
 *             warehouse_id:
 *                  type: integer
 *                  description: ID Warehouses
 *             warehouse_name:
 *                  type: string
 *                  description: Name of warehouse
 *             movement_entry_id:
 *                  type: integer
 *                  description: ID Movement Entry
 *             movement_output_id:
 *                  type: integer
 *                  description: ID Movement Output
 *             state:
 *                  type: string
 *                  description: Descriptive state of the movement
 *             responsable:
 *                  type: string
 *                  description: #
 *             is_zero:
 *                  type: integer
 *                  description: #
 *             detail_id:
 *                  type: integer
 *                  description: ID inventories details
 *             inventory_id:
 *                  type: integer
 *                  description: ID inventory
 *             product_id:
 *                  type: integer
 *                  description: ID product
 *             product_name:
 *                  type: string
 *                  description: Name of product
 *             measurement_unit_id:
 *                  type: integer
 *                  description: ID measurement unit
 *             quantity:
 *                  type: double
 *                  description: Quantity
 *             quantity_old:
 *                  type: double
 *                  description: #
 *             quantity_base:
 *                  type: double
 *                  description: #
 *             quantity_old_base:
 *                  type: double
 *                  description: #
 * 
 */

/**
 * @swagger
 *  /md_inventories:
 *   get:
 *     sumary: Get all MD inventory details
 *     tags: [MD Inventory Details]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All MD inventory details for pages
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
router.get('/', getAllMdInventories);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;