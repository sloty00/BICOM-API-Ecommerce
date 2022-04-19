//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllCRT } = require('../controllers/cash_registers_types')

/**
 * @swagger
 * components:
 *  schemas:
 *      cash_register_types:
 *          type: object
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: Primary key table cash register types
 *              branchoffice_id:
 *                  type: integer
 *                  description: ID Branchoffice
 *              description:
 *                  type: string
 *                  description: Description cash register types
 *              posmachine_id:
 *                  type: integer
 *                  description: ID pos machine
 *              warehouse_id:
 *                  type: integer
 *                  description: ID Bodega
 *              printer_id:
 *                  type: integer
 *                  description: ID Printer
 *              transbank_machines_id:
 *                  type: integer
 *                  description: ID transback nmachine
 *              state:
 *                  type: integer
 *                  description: State cash register types
 * */

/**
 * @swagger
 *  /cash_register_types:
 *   get: 
 *     sumary: Get all Cash Register Types
 *     tags: [Cash Register Types]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All Cash Register Types for pages
 *     responses:  
 *       200: 
 *         description: Success
 *   
 */ 

//Rutas.
router.get('/', getAllCRT);

//Exportamos las funciones para usar en server.js.
module.exports = router;