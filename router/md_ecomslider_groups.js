//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllEcommerceImages } = require('../controllers/md_ecomslider_groups')

/**
 * @swagger
 * components:
 *  schemas:
 *      MD Ecommerce Slider Groups:
 *          type: object
 *          properties:
 *             id:
 *                  type: integer
 *                  description: Primary key table products
 *             slider_img:
 *                  type: string
 *                  description: #
 *             title:
 *                  type: string
 *                  description: #
 *             description:
 *                  type: string
 *                  description: Description of Ecommerce Slider Groups
 *             category_id:
 *                  type: integer
 *                  description: ID Category
 *             groups_id:
 *                  type: integer
 *                  description: ID Groups
 *             groups_description:
 *                  type: string
 *                  description: Description  Groups
 *             is_ecommerce:
 *                  type: integer
 *                  description: #
 *             is_menu:
 *                  type: integer
 *                  description: #
 *             img_groups:
 *                  type: string
 *                  description: #
 */

/**
 * @swagger
 *  /md_ecom_images:
 *   get: 
 *     sumary: Get all MD ecommerce slider groups
 *     tags: [MD Ecommerce Slider Groups]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All MD ecommerce slider groups for pages
 *     responses:  
 *       200: 
 *         description: Success
 *   
 */

//Rutas.
router.get('/', getAllEcommerceImages);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;