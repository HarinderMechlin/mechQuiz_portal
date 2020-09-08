const monogoose =require('mongoose');

const PatientSchema = monogoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,      
    },
    dob:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    address:{
        type:String,
    },
    city:{
        type:String,
    },
    country:{
        type:String,
    },
    pincode:{
        type:String,
    },
    profileurl:{
        type:String,
        
    }, 
    profilename:{
        type:String,
        
    }, 
    status:{
        type:String,
        
    },
    date:{
        type:Date,
        default:Date.now
    },
});
module.exports =monogoose.model('paitent_user',PatientSchema)