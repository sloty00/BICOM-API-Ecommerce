//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllEcommerceShipping } = require('../controllers/md_ecommerce_shipping')

/**
 * @swagger
 * components:
 *  schemas:
 *      MD Ecommerce Shipping:
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
 *              services_id:
 *                  type: integer
 *                  description: ID of shipping
 *              name:
 *                  type: string
 *                  description: Name of shipping
 *              logo_path:
 *                  type: string
 *                  description: URL path logo image
 *              product_id:
 *                  type: integer
 *                  description: ID of product
 *              is_active:
 *                  type: integer
 *                  description: Is active or not
 *              is_ecommerce:
 *                  type: integer
 *                  description: Is ecommerce or not
 */

/**
 * @swagger
 *  /md_ecom_shipping:
 *   get: 
 *     sumary: Get all MD ecommerce shipping
 *     tags: [MD Ecommerce Shipping]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: All MD ecommerce shipping for pages
 *     responses:  
 *       '200': 
 *         description: Success
 *       '400':
 *         description: Bad request
 *   
 */ 

//Rutas.
router.get('/', getAllEcommerceShipping);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;