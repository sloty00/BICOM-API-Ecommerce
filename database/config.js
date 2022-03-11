const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.HOST_MONGODB, {});
        console.log("BASE DE DATOS CONECTADA")
    } catch (error) {
        console.log(error)
        throw new Error("BASE DE DATOS NO DISPONIBLE")
    }
}

module.exports = {
    dbConnection
}