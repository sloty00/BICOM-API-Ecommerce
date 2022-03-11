const {response} = require("express");
const User = require("../models/User");
const Country = require("../models/Country");
const bcrypt = require("bcryptjs");
const {generateJWT} = require("../helpers/jwt");
const s3Bucket = require('../helpers/s3');
const fs = require("fs");


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

const UpdateUserEnterprise =  async (req, res = response) => {
   const user_id = req.uid;
   let route_file_bio;
   let route_file_prof;
   try {

    if(req.files!=null){
         
        const reactFileBio = req.files.files_bio;
        if(reactFileBio!==undefined){
            let fileBinaryStringBio = fs.readFileSync(reactFileBio.tempFilePath, null);
            nameBio = req.files.files_bio.name.split('.');           
            extBio = nameBio[nameBio.length - 1];
            let filename = req.uid+'/pub/bio.'+extBio;
            const s3UploadFile = {
                Bucket: process.env.HEAVEN_AWS_BUCKET_NAME,
                Key: filename,
                Body: fileBinaryStringBio,
                ContentEncoding: reactFileBio.encoding,
                ContentType: reactFileBio.mimetype,
                ACL: 'public-read'
            }
            await new Promise((resolve, reject)=>{
                s3Bucket.putObject(s3UploadFile, (err) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve("OK");
                    }
                })
            }).then( ()=>{
                route_file_bio = `${process.env.HEAVEN_AWS_URL_BASE}/`+filename;
            }).catch((err)=>{
                console.log(err)                    
            }) 
        }
        

        const reactFileProf = req.files.files_prof;
        if(reactFileProf!==undefined){
            let fileBinaryStringProf = fs.readFileSync(reactFileProf.tempFilePath, null);
            nameProf = req.files.files_prof.name.split('.');           
            extProf = nameProf[nameProf.length - 1];
            let filename = req.uid+'/pub/profile.'+extProf;
            const s3UploadFile = {
                Bucket: process.env.HEAVEN_AWS_BUCKET_NAME,
                Key: filename,
                Body: fileBinaryStringProf,
                ContentEncoding: reactFileProf.encoding,
                ContentType: reactFileProf.mimetype,
                ACL: 'public-read'
            }
            await new Promise((resolve, reject)=>{
                s3Bucket.putObject(s3UploadFile, (err) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve("OK");
                    }
                })
            }).then( ()=>{
                route_file_prof = `${process.env.HEAVEN_AWS_URL_BASE}/`+filename;
            }).catch((err)=>{
                console.log(err)                    
            }) 
        }
    }


    let user;

    const data = {
        "email" : req.body.email,
        "address" : req.body.address,
        "country" : req.body.country,
        "category" : req.body.category,
        "description" : req.body.description,
        "name" : req.body.name,
        "phone" : req.body.phone,
        "socialMedia" : {
            "facebook" : req.body.facebook,
            "instagram" : req.body.instagram,
            "linkedin" : req.body.linkedin,
            "twitter" : req.body.twitter,
            "youtube" : req.body.youtube,
            "tiktok" : req.body.tiktok,
            "telegram" : req.body.telegram,
        },
        "username" : req.body.username
    }

    if(route_file_bio !== undefined){
        data.url_bio = route_file_bio; 
    }

    if(route_file_prof !== undefined){
        data.url_profile = route_file_prof; 
    }

    await User.findByIdAndUpdate( user_id, data, {new: true} ).populate([{path: 'country'}, {path: 'category'}]).then((result) => user = result);
    return res.status(201).json({
        ok: true,
        msg: user
    })
       
   } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Servidor'
        })
   }

}

const GetUserEnterprise =  async (req, res = response) => {
   const user_id = req.uid;
   try {
    let user;
    await User.findById( user_id).populate([{path: 'country'}, {path: 'category'}]).then((result) => user = result);
    return res.status(201).json({
        ok: true,
        msg: user
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

const GetUserFromCategory = async (req, res = response) => {
    try {
        const category_id = req.params.category;
        const page = req.params.page;
        const query = req.params.query;

        // Values Pagination
        let totalRows     = 0
        let totalPage     = 0
        let pageNumber    = parseInt(page)
        let recordPerPage = 20
        let offsetValue   = (pageNumber -1) * recordPerPage
        let dataCollect;

        if(query!==''){
            await User.find({_id: {$ne: req.uid}, category: category_id, name: new RegExp(query, 'i')}).count().then((result)=> (totalRows = result));       
        }else{
            await User.find({_id: {$ne: req.uid}, category: category_id}).count().then((result)=> (totalRows = result));       
        }
        totalPage = Math.ceil((parseFloat(totalRows) / parseFloat(recordPerPage))).toFixed(0);
        
        if(query!==''){
            await User.find({_id: {$ne: req.uid}, category: category_id, name: new RegExp(query, 'i')},["url_profile", "name", "username", "description", "address"]).limit(recordPerPage).skip(offsetValue).then((result)=> (dataCollect = result));
        }else{
            await User.find({_id: {$ne: req.uid}, category: category_id},["url_profile", "name", "username", "description", "address"]).limit(recordPerPage).skip(offsetValue).then((result)=> (dataCollect = result));
        }

        if(totalPage < pageNumber ){
            res.status(201).json({
                ok: true,
                totalRows,
                pageNumber,
                recordPerPage,
                totalPage,
                offsetValue,
                dataCollect
            });
        }else{
            res.status(201).json({
                ok: true,
                totalRows,
                pageNumber,
                recordPerPage,
                totalPage,
                offsetValue,
                dataCollect
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Servidor'
        })
    }
}


const UpdateUserClient =  async (req, res = response) => {
   
    const user_id = req.uid;
    let route_file_prof;

    try {
        if(req.files!=null){         
            const reactFileProf = req.files.files_prof;
            if(reactFileProf!==undefined){
                let fileBinaryStringProf = fs.readFileSync(reactFileProf.tempFilePath, null);
                nameProf = req.files.files_prof.name.split('.');           
                extProf = nameProf[nameProf.length - 1];
                let filename = req.uid+'/pub/profile.'+extProf;
                const s3UploadFile = {
                    Bucket: process.env.HEAVEN_AWS_BUCKET_NAME,
                    Key: filename,
                    Body: fileBinaryStringProf,
                    ContentEncoding: reactFileProf.encoding,
                    ContentType: reactFileProf.mimetype,
                    ACL: 'public-read'
                }
                await new Promise((resolve, reject)=>{
                    s3Bucket.putObject(s3UploadFile, (err) => {
                        if(err){
                            reject(err);
                        }else{
                            resolve("OK");
                        }
                    })
                }).then( ()=>{
                    route_file_prof = `${process.env.HEAVEN_AWS_URL_BASE}/`+filename;
                }).catch((err)=>{
                    console.log(err)                    
                }) 
            }
        }


        let user;

        const data = {
            "run" : req.body.run,
            "name" : req.body.namecomplete,
            "phone" : req.body.phone,            
            "address" : req.body.address,            
            "email" : req.body.email,
            "birthday" : req.body.birthday
        }

       
        if(route_file_prof !== undefined){
            data.url_profile = route_file_prof; 
        }

        await User.findByIdAndUpdate( user_id, data, {new: true} ).populate([{path: 'country'}, {path: 'category'}]).then((result) => user = result);
        return res.status(201).json({
            ok: true,
            msg: user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Servidor'
        })
    }

    console.log(req.files)
    console.log(req.body)

    return res.status(201).json({
         ok: true
    })
        
   
 
 }


module.exports = { 
    registerUser,
    loginUser,
    renewToken,
    UpdateUserEnterprise,
    UpdateUserClient,
    GetUserEnterprise,
    GetUserFromCategory
}