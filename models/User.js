const {Schema, model} = require('mongoose');


const userSchema = Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: Number,
        default: 1
    },
    name: {
        type: String
    },
    run: {
        type: String
    },
    username: {
        type: String,
        unique: true
    },
    description: {
        type: String
    },
    address:{
        type: String
    },
    birthday:{
        type: String
    },
    phone: {
        type: String
    }, 
    socialMedia: {
        facebook : {
            type: String
        },
        instagram : {
            type: String
        },
        linkedin : {
            type: String
        },
        twitter : {
            type: String
        },
        youtube : {
            type: String
        },
        tiktok : {
            type: String
        },
        telegram : {
            type: String
        }
    },    
    country : {
        type: Schema.Types.ObjectId, 
        ref: 'Country' 
    },
    category : {
        type: Schema.Types.ObjectId, 
        ref: 'Category' 
    },
    followers : [{
        type: Schema.Types.ObjectId, 
        ref: 'SubscriptionUser' 
    }],
    url_bio: {
        type: String
    },
    url_profile: {
        type: String
    }
   
}, {versionKey: false});

module.exports = model('User', userSchema);

