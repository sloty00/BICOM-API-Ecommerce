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

/*-------------------------------TABLAS (FILTRO: BOLETAS EXENTAS)--------------------------------*/

SELECT mov.id, mov.branchoffice_id, mov.code_sii, mov.folio, mov.concept_code, 
mov.concept_id, mov.invoice_date, mov.document_type_id, mov_det.id as detail_id
FROM movements AS mov LEFT OUTER JOIN movement_details AS mov_det 
ON (mov.id = mov_det.movement_id) WHERE mov.document_type_id = 2

/*-------------------------------TABLAS (FILTRO: GUIAS DE ENTRADA)--------------------------------*/

SELECT mov.id, mov.branchoffice_id, mov.code_sii, mov.folio, mov.concept_code, 
mov.concept_id, mov.invoice_date, mov.document_type_id, mov_det.id as detail_id
FROM movements AS mov LEFT OUTER JOIN movement_details AS mov_det 
ON (mov.id = mov_det.movement_id) WHERE mov.document_type_id = 11

/*-------------------------------TABLAS (FILTRO: FACTURA EXENTA)--------------------------------*/

SELECT mov.id, mov.branchoffice_id, mov.code_sii, mov.folio, mov.concept_code, 
mov.concept_id, mov.invoice_date, mov.document_type_id, mov_det.id as detail_id
FROM movements AS mov LEFT OUTER JOIN movement_details AS mov_det 
ON (mov.id = mov_det.movement_id) WHERE mov.document_type_id = 4

/*-------------------------------TABLAS (FILTRO: NOTA DE CREDITO)--------------------------------*/

SELECT mov.id, mov.branchoffice_id, mov.code_sii, mov.folio, mov.concept_code, 
mov.concept_id, mov.invoice_date, mov.document_type_id, mov_det.id as detail_id
FROM movements AS mov LEFT OUTER JOIN movement_details AS mov_det 
ON (mov.id = mov_det.movement_id) WHERE mov.document_type_id = 8

/*-------------------------------TABLAS (FILTRO: NOTA DE DEBITO)--------------------------------*/

SELECT mov.id, mov.branchoffice_id, mov.code_sii, mov.folio, mov.concept_code, 
mov.concept_id, mov.invoice_date, mov.document_type_id, mov_det.id as detail_id
FROM movements AS mov LEFT OUTER JOIN movement_details AS mov_det 
ON (mov.id = mov_det.movement_id) WHERE mov.document_type_id = 7

/*
----------------TABLA MAESTRO DETALLE (MOVEMENTS, MOVEMENTS_DETAILS = GUIA DE DESPACHO)----------------------
*/

SELECT mov.`id`, mov.`branchoffice_id`, mov.`code_sii`, mov.`folio`, mov.`concept_code`, mov.`concept_id`, mov.`invoice_date`, mov.`customer_supplier_id`, mov.`customer_supplier_name`, mov.`customer_supplier_activity`, mov.`document_type_id`, mov.`descriptions`, mov.`cost_center_id`, mov.`seller_id`, mov.`user_id`, mov.`payment_type_id`, mov.`subtotal`, mov.`value_discount`, mov.`type_discount`, mov.`total_discount`, mov.`total_discount_items`, mov.`tax`, mov.`total`, mov.`consolidate`, mov.`is_exempt`, mov.`warehouse_id`, mov.`warehouse_name`, mov.`warehouse_origin_id`, mov.`warehouse_destination_id`, mov.`cash_register_type_id`, mov.`cash_register_id`, mov.`posmachine_id`, mov.`state`, mov.`document_date`, mov.`number_document`, mov.`responsable`, mov.`reference_id`, mov.`reference_cancel_id`, mov.`state_send_sii`, mov.`state_response_sii`, mov.`payment_type_sii`, mov.`cod_referencia_sii`, mov.`type_dispatch_sii`, mov.`index_dispatch_sii`, mov.`autoguide`, mov.`is_sii`, mov.`activity_id`, mov.`activity_descriptions`, mov.`company_activity_id`, mov.`date_expiration`, mov.`exempt`, mov.`total_ila`, mov.`ticket_id`, mov.`value_tip`, mov.`invoice_time`, mov.`is_receptor`, mov.`is_contribuyente`, mov.`tax_value_bh`, mov.`is_ecommerce`, mov.`state_ecommerce`, mov.`phone_ecommerce`, mov.`address_ecommerce`, mov.`payment_method_ecommerce`, mov.`desired_date_ecommerce`, mov.`delivery_ecommerce`, mov.`is_appmobile`, mov.`mongodb_id`, mov.`surcharge_value`, mov.`json_dte`, mov_det.`id` as detail_id, mov_det.`movement_id`, mov_det.`product_id`, mov_det.`product_name`, mov_det.`measurement_unit_id`, mov_det.`price_net`, mov_det.`price_brute`, mov_det.`price_cost`, mov_det.`price_net_new`, mov_det.`quantity_out`, mov_det.`quantity_in`, mov_det.`quantity_dispatch`, mov_det.`total_tax`, mov_det.`consolidate`, mov_det.`total` as detail_total, mov_det.`product_descriptions`, mov_det.`kit_id`, mov_det.`kit_line`, mov_det.`tax_id`, mov_det.`value_ila`, mov_det.`promotion_id`, mov_det.`promotion_quantity`, mov_det.`promotion_oper`, mov_det.`promotion_discount_n`, mov_det.`promotion_discount_b`, mov_det.`net_logistic`, mov_det.`net_logistic_total` FROM movements AS mov LEFT OUTER JOIN movement_details AS mov_det ON (mov.id = mov_det.movement_id) WHERE mov.document_type_id = 10