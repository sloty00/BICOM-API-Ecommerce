//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllEcommp } = require('../controllers/md_ecommerce_sellers_warehouses')

/**
 * @swagger
 * components:
 *  schemas:
 *      MD Ecommerce Sellers Warehouses:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Primary key table products
 *              top_message:
 *                  type: string
 *                  description: Message top
 *              img_slider_one:
 *                  type: string
 *                  description: URL image slider one
 *              img_slider_two:
 *                  type: string
 *                  description: URL image slider two
 *              txt_slider_one:
 *                  type: string
 *                  description: Text of image slider one
 *              img_slider_three:
 *                  type: string
 *                  description: URL of image slider three
 *              txt_slider_two:
 *                  type: string
 *                  description: Text of image slider two
 *              txt_two_slider_one:
 *                  type: string
 *                  description: Text of image two slider one
 *              txt_two_slider_two:
 *                  type: string
 *                  description: Text of image two slider two
 *              txt_two_slider_three:
 *                  type: string
 *                  description: Text of image two slider three
 *              category_slider_one:
 *                  type: string
 *                  description: #
 *              category_slider_two:
 *                  type: string
 *                  description: #
 *              category_slider_three:
 *                  type: string
 *                  description: #
 *              img_facebook_thumbnail:
 *                  type: string
 *                  description: #
 *              img_about_one:
 *                  type: string
 *                  description: #
 *              txt_about_one:
 *                  type: string
 *                  description: #
 *              email_contact_web:
 *                  type: string
 *                  description: #
 *              template_send_mail:
 *                  type: string
 *                  description: #
 *              template_send_mail_order:
 *                  type: string
 *                  description: #
 *              longitude:
 *                  type: string
 *                  description: #
 *              latitude:
 *                  type: string
 *                  description: #
 *              payment_type:
 *                  type: integer
 *                  description: #
 *              payment_methods:
 *                  type: integer
 *                  description: #
 *              commerce_code:
 *                  type: string
 *                  description: #
 *              public_key:
 *                  type: string
 *                  description: #
 *              private_key:
 *                  type: string
 *                  description: #
 *              transbank_key:
 *                  type: string
 *                  description: #
 *              api_key:
 *                  type: string
 *                  description: #
 *              secret_key:
 *                  type: string
 *                  description: #
 *              color_picker:
 *                  type: string
 *                  description: #
 *              hours:
 *                  type: string
 *                  description: #
 *              prod_cert:
 *                  type: integer
 *                  description: #
 *              email_one:
 *                  type: integer
 *                  description: #
 *              email_two:
 *                  type: string
 *                  description: #
 *              email_three:
 *                  type: string
 *                  description: #
 *              email_four:
 *                  type: string
 *                  description: #
 *              social_network_one:
 *                  type: string
 *                  description: #
 *              social_network_two:
 *                  type: string
 *                  description: #
 *              social_network_three:
 *                  type: string
 *                  description: #
 *              social_network_four:
 *                  type: string
 *                  description: #
 *              img_out_stock:
 *                  type: string
 *                  description: #
 *              view_out_of_stock:
 *                  type: integer
 *                  description: #
 *              sell_out_of_stock:
 *                  type: integer
 *                  description: #
 *              seller_id:
 *                  type: integer
 *                  description: #
 *              product_dispatch_id:
 *                  type: integer
 *                  description: #
 *              price_product_dispatch:
 *                  type: integer
 *                  description: #
 *              has_pickup:
 *                  type: integer
 *                  description: #
 *              has_delivery:
 *                  type: integer
 *                  description: #
 *              wsp_title:
 *                  type: string
 *                  description: #
 *              wsp_message:
 *                  type: string
 *                  description: #
 *              wsp_number:
 *                  type: string
 *                  description: #
 *              img_placeholder:
 *                  type: string
 *                  description: #
 *              img_favicon:
 *                  type: string
 *                  description: #
 *              warehouse_id:
 *                  type: integer
 *                  description: #
 *              has_share:
 *                  type: integer
 *                  description: #
 * 
 *              sell.id:
 *                  type: integer
 *                  description: #
 *              sell.user_id:
 *                  type: integer
 *                  description: #
 *              ware.id:
 *                  type: integer
 *                  description: #
 *              ware.`code`:
 *                  type: string
 *                  description: #
 *              ware.description:
 *                  type: string
 *                  description: #
 *              ware.address:
 *                  type: string
 *                  description: #
 *              ware.is_ecommerce:
 *                  type: integer
 *                  description: #
 */ 

/**
 * @swagger
 *  /md_ecom_sellers_warehouses:
 *   get: 
 *     sumary: Get all MD ecommerce-sellers-warehouses
 *     tags: [MD Ecommerce Sellers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All MD ecommerce-sellers-warehouses for pages
 *     responses:  
 *       200: 
 *         description: Success
 *   
 */ 

//Rutas.
router.get('/', getAllEcommp);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;