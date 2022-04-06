/*
----------------TABLA MAESTRO DETALLE (INVENTORIES, INVENTORY_DETAILS)----------------------
*/

SELECT
inv.id, inv.branchoffice_id, inv.invoice_date, inv.descriptions, inv.cost_center_id, inv.consolidate, 
inv.warehouse_id, inv.warehouse_name, inv.movement_entry_id, inv.movement_output_id, inv.state, 
inv.responsable, inv.is_zero,

inv_det.id, inv_det.inventory_id, inv_det.product_id, inv_det.product_name, 
inv_det.measurement_unit_id, inv_det.warehouse_id, inv_det.warehouse_name, inv_det.quantity, 
inv_det.quantity_old, inv_det.quantity_base, inv_det.quantity_old_base

FROM
inventories AS inv, inventory_details AS inv_det
WHERE 
inv.id = inv_det.inventory_id

/*--------------------------------------------------------------------------------------------------*/

SELECT inv.id, inv.branchoffice_id, inv.invoice_date, inv.descriptions, inv.cost_center_id, 
inv.consolidate, inv.warehouse_id, inv.warehouse_name, inv.movement_entry_id, inv.movement_output_id, 
inv.state, inv.responsable, inv.is_zero, inv_det.id as detail_id, inv_det.inventory_id, 
inv_det.product_id, inv_det.product_name, inv_det.measurement_unit_id, inv_det.quantity, 
inv_det.quantity_old, inv_det.quantity_base, inv_det.quantity_old_base FROM inventories AS inv 
LEFT OUTER JOIN inventory_details AS inv_det ON (inv.id = inv_det.inventory_id)

/*-------------------------------TABLAS (FILTRO: GUIAS DE DESPACHO)--------------------------------*/

SELECT mov.id, mov.branchoffice_id, mov.code_sii, mov.folio, mov.concept_code, 
mov.concept_id, mov.invoice_date, mov.document_type_id, mov_det.id as detail_id
FROM movements AS mov LEFT OUTER JOIN movement_details AS mov_det 
ON (mov.id = mov_det.movement_id) WHERE mov.document_type_id = 10

/*
----------------TABLA MAESTRO DETALLE (MOVEMENTS, MOVEMENTS_DETAILS = GUIA DE DESPACHO)----------------------
*/

SELECT mov.`id`, mov.`branchoffice_id`, mov.`code_sii`, mov.`folio`, mov.`concept_code`, mov.`concept_id`, mov.`invoice_date`, mov.`customer_supplier_id`, mov.`customer_supplier_name`, mov.`customer_supplier_activity`, mov.`document_type_id`, mov.`descriptions`, mov.`cost_center_id`, mov.`seller_id`, mov.`user_id`, mov.`payment_type_id`, mov.`subtotal`, mov.`value_discount`, mov.`type_discount`, mov.`total_discount`, mov.`total_discount_items`, mov.`tax`, mov.`total`, mov.`consolidate`, mov.`is_exempt`, mov.`warehouse_id`, mov.`warehouse_name`, mov.`warehouse_origin_id`, mov.`warehouse_destination_id`, mov.`cash_register_type_id`, mov.`cash_register_id`, mov.`posmachine_id`, mov.`state`, mov.`document_date`, mov.`number_document`, mov.`responsable`, mov.`reference_id`, mov.`reference_cancel_id`, mov.`state_send_sii`, mov.`state_response_sii`, mov.`payment_type_sii`, mov.`cod_referencia_sii`, mov.`type_dispatch_sii`, mov.`index_dispatch_sii`, mov.`autoguide`, mov.`is_sii`, mov.`activity_id`, mov.`activity_descriptions`, mov.`company_activity_id`, mov.`date_expiration`, mov.`exempt`, mov.`total_ila`, mov.`ticket_id`, mov.`value_tip`, mov.`invoice_time`, mov.`is_receptor`, mov.`is_contribuyente`, mov.`tax_value_bh`, mov.`is_ecommerce`, mov.`state_ecommerce`, mov.`phone_ecommerce`, mov.`address_ecommerce`, mov.`payment_method_ecommerce`, mov.`desired_date_ecommerce`, mov.`delivery_ecommerce`, mov.`is_appmobile`, mov.`mongodb_id`, mov.`surcharge_value`, mov.`json_dte`, mov_det.`id` as detail_id, mov_det.`movement_id`, mov_det.`product_id`, mov_det.`product_name`, mov_det.`measurement_unit_id`, mov_det.`price_net`, mov_det.`price_brute`, mov_det.`price_cost`, mov_det.`price_net_new`, mov_det.`quantity_out`, mov_det.`quantity_in`, mov_det.`quantity_dispatch`, mov_det.`total_tax`, mov_det.`consolidate`, mov_det.`total` as detail_total, mov_det.`product_descriptions`, mov_det.`kit_id`, mov_det.`kit_line`, mov_det.`tax_id`, mov_det.`value_ila`, mov_det.`promotion_id`, mov_det.`promotion_quantity`, mov_det.`promotion_oper`, mov_det.`promotion_discount_n`, mov_det.`promotion_discount_b`, mov_det.`net_logistic`, mov_det.`net_logistic_total` FROM movements AS mov LEFT OUTER JOIN movement_details AS mov_det ON (mov.id = mov_det.movement_id) WHERE mov.document_type_id = 10

/*
----------------TABLA MAESTRO DETALLE (PRODUCTS, ECOMMERCE_PRODUCTS_IMAGES DONDE IS_ECOMMERCE = 1)----------------------
*/

SELECT prod.id, prod.`code`, prod.barcode, prod.barcode_type, prod.description, prod.description_details, prod.measurement_unit_id, prod.group_id, prod.sub_group_id, prod.price_net, prod.cl_price_net_prod, prod.cl_price_net_logistic, prod.price_brute, prod.is_inventory, prod.is_visiblePOS, prod.is_active, prod.img_one, prod.price_lastpur, prod.stockmax, prod.stockrep, prod.stockmin, prod.measurement_unit_convert_id, prod.equivalence, prod.custom1, prod.custom2, prod.custom3, prod.custom4, prod.custom5, prod.cost_prom, prod.equivalence_two, prod.weight, prod.is_kit, prod.has_kit, prod.is_ticket, prod.is_aggregate, prod.is_ecommerce, prod.print_details, prod.is_recurrent, prod.price_net_uf, prod.is_free, ecoprodi.id, ecoprodi.product_id, ecoprodi.img_one, ecoprodi.img_two, ecoprodi.img_three, ecoprodi.img_four, ecoprodi.img_five, ecoprodi.product_details, ecoprodi.product_details_short FROM products AS prod LEFT OUTER JOIN ecommerce_product_images AS ecoprodi ON prod.id = ecoprodi.product_id WHERE prod.is_ecommerce = 1 AND prod.deleted_at is null

/*
----------------TABLA MAESTRO DETALLE (ECOMMERCE_PARAMS CON WAREHOUSES Y SELLERS)----------------------
*/

SELECT ecommp.id, ecommp.top_message, ecommp.img_slider_one, ecommp.img_slider_two, ecommp.img_slider_three, ecommp.txt_slider_one, ecommp.txt_slider_two, ecommp.txt_slider_three, ecommp.txt_two_slider_one, ecommp.txt_two_slider_two, ecommp.txt_two_slider_three, ecommp.category_slider_one, ecommp.category_slider_two, ecommp.category_slider_three, ecommp.img_facebook_thumbnail, ecommp.img_about_one, ecommp.txt_about_one, ecommp.deleted_at, ecommp.created_at, ecommp.updated_at, ecommp.email_contact_web, ecommp.template_send_mail, ecommp.template_send_mail_order, ecommp.longitude, ecommp.latitude, ecommp.payment_type, ecommp.payment_methods, ecommp.commerce_code, ecommp.public_key, ecommp.private_key, ecommp.transbank_key, ecommp.api_key, ecommp.secret_key, ecommp.color_picker, ecommp.hours, ecommp.prod_cert, ecommp.email_one, ecommp.email_two, ecommp.email_three, ecommp.email_four, ecommp.social_network_one, ecommp.social_network_two, ecommp.social_network_three, ecommp.social_network_four, ecommp.img_out_stock, ecommp.view_out_of_stock, ecommp.sell_out_of_stock, ecommp.seller_id, ecommp.product_dispatch_id, ecommp.price_product_dispatch, ecommp.has_pickup, ecommp.has_delivery, ecommp.wsp_title, ecommp.wsp_message, ecommp.wsp_number, ecommp.img_placeholder, ecommp.img_favicon, ecommp.warehouse_id, ecommp.has_share, sell.id, sell.user_id, ware.id, ware.`code`, ware.description, ware.address, ware.is_ecommerce FROM (ecommerce_parameters AS ecommp INNER JOIN sellers as sell ON ecommp.seller_id = sell.id) INNER JOIN warehouses as ware ON ecommp.warehouse_id = ware.id

/*
----------------TABLA MAESTRO DETALLE (ECOMMERCE, SHIPPING_SERVICES DONDE IS_ECOMMERCE = 1)----------------------
*/

SELECT ecommerce_parameters.id, ecommerce_parameters.top_message, ecommerce_parameters.img_slider_one, ecommerce_parameters.img_slider_two, ecommerce_parameters.img_slider_three, ecommerce_parameters.txt_slider_one, ecommerce_parameters.txt_slider_two, ecommerce_parameters.txt_slider_three, ecommerce_parameters.txt_two_slider_one, ecommerce_parameters.txt_two_slider_two, ecommerce_parameters.txt_two_slider_three, ecommerce_parameters.category_slider_one, ecommerce_parameters.category_slider_two, ecommerce_parameters.category_slider_three, ecommerce_parameters.img_facebook_thumbnail, ecommerce_parameters.img_about_one, ecommerce_parameters.txt_about_one, ecommerce_parameters.email_contact_web, ecommerce_parameters.template_send_mail, ecommerce_parameters.template_send_mail_order, ecommerce_parameters.longitude, ecommerce_parameters.latitude, ecommerce_parameters.payment_type, ecommerce_parameters.payment_methods, ecommerce_parameters.commerce_code, ecommerce_parameters.public_key, ecommerce_parameters.private_key, ecommerce_parameters.transbank_key, ecommerce_parameters.api_key, ecommerce_parameters.secret_key, ecommerce_parameters.color_picker, ecommerce_parameters.hours, ecommerce_parameters.prod_cert, ecommerce_parameters.email_one, ecommerce_parameters.email_two, ecommerce_parameters.email_three, ecommerce_parameters.email_four, ecommerce_parameters.social_network_one, ecommerce_parameters.social_network_two, ecommerce_parameters.social_network_three, ecommerce_parameters.social_network_four, ecommerce_parameters.img_out_stock, ecommerce_parameters.view_out_of_stock, ecommerce_parameters.sell_out_of_stock, ecommerce_parameters.seller_id, ecommerce_parameters.product_dispatch_id, ecommerce_parameters.price_product_dispatch, ecommerce_parameters.has_pickup, ecommerce_parameters.has_delivery, ecommerce_parameters.wsp_title, ecommerce_parameters.wsp_message, ecommerce_parameters.wsp_number, ecommerce_parameters.img_placeholder, ecommerce_parameters.img_favicon, ecommerce_parameters.warehouse_id, ecommerce_parameters.has_share,shipping_services.id, shipping_services.`name`, shipping_services.logo_path, shipping_services.product_id, shipping_services.is_active, shipping_services.is_ecommerce FROM `ecommerce_parameters` LEFt JOIN shipping_services ON shipping_services.is_ecommerce = '1' WHERE ecommerce_parameters.deleted_at is null

/*
------------------------TABLA MAESTRO DETALLE (ECOMMERCE_SLIDER_IMAGES, GROUPS POR CATEGORY)-------------------------
*/

SELECT ecommerce_slider_images.id, ecommerce_slider_images.slider_img, ecommerce_slider_images.title, ecommerce_slider_images.description, ecommerce_slider_images.category_id, groups.id as groups_id, groups.description as groups_description, groups.is_ecommerce, groups.is_menu, groups.img_groups FROM ecommerce_slider_images LEFT OUTER JOIN `groups` ON ecommerce_slider_images.category_id = groups.id; WHERE ecommerce_slider_images.deleted_at is null

/*
--------------------------------------TABLA SIMPLE(ECOMMERCE_SLIDER_BRANDS)---------------------------------------
*/

SELECT ecommerce_slider_brands.id, ecommerce_slider_brands.slider_img FROM ecommerce_slider_brands WHERE ecommerce_slider_brands.deleted_at is null















/*
--------------------------------------TABLA MAESTRO DETALLE(PRODUCTS - PRODUCTS_TAXES - TAXES)---------------------------------------
*/

SELECT products.id, products.`code`, products.barcode, products.barcode_type, products.description_details, products.description, products.measurement_unit_id, products.group_id, products.sub_group_id, products.price_net, products.cl_price_net_prod, products.cl_price_net_logistic, products.price_brute, products.is_inventory, products.is_visiblePOS, products.is_active, products.img_one, products.price_lastpur, products.stockmax, products.stockrep, products.stockmin, products.measurement_unit_convert_id, products.equivalence, products.custom1, products.custom2, products.custom3, products.custom4, products.custom5, products.cost_prom, products.equivalence_two, products.weight, products.is_kit, products.has_kit, products.is_ticket, products.is_aggregate, products.is_ecommerce, products.print_details, products.is_recurrent, products.price_net_uf, products.is_free, product_taxes.id AS product_taxes_id, taxes.id AS taxes_id, taxes.type, taxes.`value` FROM ( products LEFT OUTER JOIN product_taxes ON products.id = product_taxes.product_id ) LEFT OUTER JOIN taxes ON taxes.id = product_taxes.tax_id WHERE products.deleted_at IS NULL LIMIT

/*
--------------------------------------TABLA MAESTRO DETALLE(LIST_PRICES - LIST_PRICE_PRODUCTS)---------------------------------------
*/

SELECT list_prices.id, list_prices.description, list_prices.formula, list_prices.date_ini, list_prices.date_end, list_prices.operation, list_prices.is_ecommerce, list_price_products.id AS list_price_products_id, list_price_products.list_price_id, list_price_products.product_id, list_price_products.price_brute, list_price_products.price_net FROM `list_prices` LEFT OUTER JOIN list_price_products ON list_prices.id = list_price_products.list_price_id WHERE list_prices.deleted_at is null

/*
--------------------------------------TABLA MAESTRO DETALLE(TRANSBANK_MACHINES - BRANCHOFFICE)---------------------------------------
*/

SELECT t_machines.id, t_machines.`code`, t_machines.description, branchoffices.id AS branchoffices_id, branchoffices.company_data_id, branchoffices.rut, branchoffices.business_name, branchoffices.fantasy_name, branchoffices.main_activity, branchoffices.address, branchoffices.country_id, branchoffices.region_id, branchoffices.city_id, branchoffices.commune_id, branchoffices.phone, branchoffices.phone_two, branchoffices.init_date_activity, branchoffices.rut_representative, branchoffices.first_name_representative, branchoffices.last_name_representative, branchoffices.email_contact, branchoffices.email_dte, branchoffices.website, branchoffices.img_logo, branchoffices.resolution_date, branchoffices.number_resolution, branchoffices.amipass_local, branchoffices.deleted_at, branchoffices.created_at, branchoffices.updated_at, branchoffices.code_sii FROM transbank_machines AS t_machines LEFT OUTER JOIN branchoffices ON t_machines.branchoffice_id = branchoffices.id WHERE t_machines.deleted_at IS NULL

/*
--------------------------------------TABLA MAESTRO DETALLE(TICKET_BIMARKETS - TICKET_BIMARKETS_DETAILS)---------------------------------------
*/

SELECT t_bimarkets.id, t_bimarkets.branchoffice_id, t_bimarkets.code_sii, t_bimarkets.folio, t_bimarkets.concept_code, t_bimarkets.concept_id, t_bimarkets.invoice_date, t_bimarkets.customer_supplier_id, t_bimarkets.customer_supplier_name, t_bimarkets.customer_supplier_activity, t_bimarkets.document_type_id, t_bimarkets.descriptions, t_bimarkets.cost_center_id, t_bimarkets.seller_id, t_bimarkets.user_id, t_bimarkets.payment_type_id, t_bimarkets.subtotal, t_bimarkets.value_discount, t_bimarkets.type_discount, t_bimarkets.total_discount, t_bimarkets.total_discount_items, t_bimarkets.tax, t_bimarkets.total, t_bimarkets.consolidate, t_bimarkets.is_exempt, t_bimarkets.warehouse_id, t_bimarkets.warehouse_name, t_bimarkets.warehouse_origin_id, t_bimarkets.warehouse_destination_id, t_bimarkets.cash_register_type_id, t_bimarkets.cash_register_id, t_bimarkets.posmachine_id, t_bimarkets.state, t_bimarkets.document_date, t_bimarkets.number_document, t_bimarkets.responsable, t_bimarkets.reference_id, t_bimarkets.reference_cancel_id, t_bimarkets.state_response_sii, t_bimarkets.state_send_sii, t_bimarkets.payment_type_sii, t_bimarkets.cod_referencia_sii, t_bimarkets.type_dispatch_sii, t_bimarkets.index_dispatch_sii, t_bimarkets.autoguide, t_bimarkets.is_sii, t_bimarkets.activity_id, t_bimarkets.activity_descriptions, t_bimarkets.company_activity_id, t_bimarkets.date_expiration, t_bimarkets.exempt, t_bimarkets.total_ila, t_bimarkets.movement_id, t_bimarkets.value_tip, t_bimarkets.invoice_time, t_bimarkets.is_receptor, t_bimarkets.is_contribuyente, t_bimarkets.tax_value_bh, t_bimarkets.is_ecommerce, t_bimarkets.state_ecommerce, t_bimarkets.phone_ecommerce, t_bimarkets.payment_method_ecommerce, t_bimarkets.desired_date_ecommerce, t_bimarkets.delivery_ecommerce, t_bimarkets.is_appmobile, t_bimarkets.reserve_cash_register, t_bimarketsd.id AS ticket_bimarket_details_id,  t_bimarketsd.ticket_bimarket_id, t_bimarketsd.product_id, t_bimarketsd.product_name, t_bimarketsd.measurement_unit_id, t_bimarketsd.price_net, t_bimarketsd.price_brute, t_bimarketsd.price_cost, t_bimarketsd.price_net_new, t_bimarketsd.quantity_out, t_bimarketsd.quantity_in, t_bimarketsd.quantity_dispatch,  t_bimarketsd.total_tax, t_bimarketsd.created_at, t_bimarketsd.updated_at, t_bimarketsd.quantity_out_base, t_bimarketsd.quantity_in_base, t_bimarketsd.quantity_dispatch_base, t_bimarketsd.measurement_unit_two_id, t_bimarketsd.type_equivalence, t_bimarketsd.equivalence, t_bimarketsd.product_descriptions, t_bimarketsd.kit_id, t_bimarketsd.kit_line, t_bimarketsd.tax_id, t_bimarketsd.value_ila, t_bimarketsd.promotion_id, t_bimarketsd.promotion_quantity, t_bimarketsd.promotion_oper, t_bimarketsd.promotion_discount_n, t_bimarketsd.promotion_discount_b FROM ticket_bimarkets AS t_bimarkets LEFT OUTER  JOIN ticket_bimarket_details AS t_bimarketsd ON t_bimarkets.id = t_bimarketsd.ticket_bimarket_id

/*
--------------------------------------TABLA MAESTRO DETALLE(QUOTES - QUOTES_DETAILS)---------------------------------------
*/

SELECT quotes.id, quotes.branchoffice_id, quotes.code_sii, quotes.concept_code, quotes.concept_id, quotes.quote_date, quotes.customer_supplier_id, quotes.customer_supplier_name, quotes.customer_supplier_activity, quotes.document_type_id, quotes.descriptions, quotes.cost_center_id, quotes.seller_id, quotes.user_id, quotes.payment_type_id, quotes.subtotal, quotes.value_discount, quotes.type_discount, quotes.total_discount, quotes.total_discount_items, quotes.tax, quotes.total, quotes.consolidate, quotes.is_exempt, quotes.warehouse_id, quotes.warehouse_name, quotes.warehouse_origin_id, quotes.warehouse_destination_id, quotes.cash_register_type_id, quotes.cash_register_id, quotes.posmachine_id, quotes.state, quotes.document_date, quotes.number_document, quotes.responsable, quotes.reference_id, quotes.reference_cancel_id, quotes.state_send_sii, quotes.state_response_sii, quotes.payment_type_sii, quotes.cod_referencia_sii, quotes.type_dispatch_sii, quotes.index_dispatch_sii, quotes.autoguide, quotes.is_sii, quotes.activity_id, quotes.activity_descriptions, quotes.company_activity_id, quotes.date_expiration, quotes.exempt, quotes.folio, quotes.total_ila, quotes.is_around, quotes.is_shipping, quotes.shipping_service_id, quotes.tariff_id, quotes.shipping_destination_id, quotes.mongodb_id,quote_details.id AS quotes_details_id, quote_details.quote_id, quote_details.product_id, quote_details.product_name, quote_details.product_weight, quote_details.measurement_unit_id, quote_details.price_net, quote_details.price_brute, quote_details.price_cost, quote_details.price_net_new, quote_details.quantity_out, quote_details.quantity_in, quote_details.quantity_dispatch, quote_details.quantity_out_base, quote_details.quantity_in_base, quote_details.quantity_dispatch_base, quote_details.measurement_unit_two_id, quote_details.type_equivalence, quote_details.equivalence, quote_details.total_tax, quote_details.product_descriptions, quote_details.tax_id, quote_details.value_ila FROM quotes LEFT OUTER JOIN quote_details ON quotes.id = quote_details.quote_id

