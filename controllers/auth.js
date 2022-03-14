const {response} = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {generateJWT} = require("../helpers/jwt");


const registerUser =  async (req, res = response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({email : email })
        
        if(user){
            return res.status(400).json({
                ok: false,
                msg: 'El email ya esta en uso'
            })
        }

      

        user = new User(req.body);

        // Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        user.username = Math.random().toString(16).substring(2);

        await user.save();

        // Generar Token
        const token = await generateJWT(user.id, user.email);

        return res.status(201).json({
            ok: true,
            uid: user.id,
            email: user.email,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Servidor'
        })
    }
    
}

const loginUser =  async (req, res = response) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email : email })
        
        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o contraseña no corresponde'
            })
        }

        // confirmar password
        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword){
           return res.status(400).json({
                ok: false,
                msg: 'La contraseña no corresponde'
            })
        }

        // Generar Token
        const token = await generateJWT(user.id, user.email);

        return res.status(201).json({
            ok: true,
            uid: user.id,
            email: user.email,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Servidor'
        })
    }

}





const renewToken =  async (req, res = response) => {
    const token = await generateJWT(req.uid, req.email);
    res.json({
        ok: true,
        uid: req.uid,
        email: req.email,
        token
    })
}







module.exports = { 
    registerUser,
    loginUser,
    renewToken    
}