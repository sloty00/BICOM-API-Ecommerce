const jwt = require('jsonwebtoken');

const generateUrlPayment = (PayloadToSign) => {
    const secret_key = 'b6b76558acd4ceebfdb9eabd2fddd55b';
    const token = jwt.sign(PayloadToSign, secret_key);
    const apiKeyURL = "api_key="+PayloadToSign.api_key;
    const emailURL = "email="+PayloadToSign.email;
    const social_idURL = "social_id="+PayloadToSign.social_id;
    const first_nameURL = "first_name="+PayloadToSign.first_name;
    const last_nameURL = "last_name="+PayloadToSign.last_name;
    const url_retornoURL = "url_retorno="+PayloadToSign.url_retorno;
    const montoURL = "monto="+PayloadToSign.monto;
    const buy_orderURL = "buy_order="+PayloadToSign.buy_order;       
    const detalleURL = "detalle="+PayloadToSign.detalle;    
    const metodo_pagoURL = "metodo_pago="+PayloadToSign.metodo_pago;     
    const s = "s="+token;
    return urlGenerated = "https://api.virtualpos-sandbox.com/v2/payment/request?"+apiKeyURL+"&"+emailURL+"&"+social_idURL+"&"+first_nameURL+"&"+last_nameURL+"&"+url_retornoURL+"&"+montoURL+"&"+buy_orderURL+"&"+detalleURL+"&"+metodo_pagoURL+"&"+s;
} 


const generateUrlPaymentGetStatus = (PayloadToSign) => {
    const secret_key = 'b6b76558acd4ceebfdb9eabd2fddd55b';
    const token = jwt.sign(PayloadToSign, secret_key);
    const apiKeyURL = "api_key="+PayloadToSign.api_key;
    const uuidURL = "uuid="+PayloadToSign.uuid;    
    const s = "s="+token;
    return urlGenerated = "https://api.virtualpos-sandbox.com/v2/payment/getstatus?"+apiKeyURL+"&"+uuidURL+"&"+s;
} 



module.exports = {
    generateUrlPayment,
    generateUrlPaymentGetStatus
}