const monogoose =require('mongoose');

const DocSchema = monogoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,      
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
    cityofpractice:{
        type:String,
        required:true
    },
    
    typeofpractice:{
        type:String,
        required:true
    },
    
    areaofspecialisation:{
        type:String,
        required:true
    },
    
    status:{
        type:String,

    },
    
    date:{
        type:Date,
        default:Date.now
    },
});
module.exports =monogoose.model('doctor_user',DocSchema)