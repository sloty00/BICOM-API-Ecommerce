const req = require("express/lib/request");
const User = require("../models/User");


const validateUniqueEmailUser = async( email, {req} ) => {
    const exist = await User.findOne({email:email, _id: {$ne: req.uid}});
    if ( exist ) {
        throw new Error(`El email ya existe ${ email }`);
    }
}

const validateUniqueUserName = async( username, {req} ) => {
    const exist = await User.findOne({username:username , _id: {$ne: req.uid}});
    if ( exist ) {
        throw new Error(`El username ya existe ${ username }`);
    }
}

module.exports = {
    validateUniqueEmailUser,
    validateUniqueUserName
}