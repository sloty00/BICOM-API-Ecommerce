const jwt = require("jsonwebtoken");

const generateJWT = (uid, email) => {

    return new Promise( (resolve, reject) => {
        const payload = {uid, email};
        jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: '2h',
        }, (err, token) => {
            if(err){
                console.log(err);
                reject("No se completo la creación del token")
            }
            resolve(token)
        })
    })
}



module.exports = {
    generateJWT
}