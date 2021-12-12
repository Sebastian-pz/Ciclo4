const {Schema, model} = require('mongoose');

const user = new Schema({
    name:{
        type:String,
        required:true,
    },
    id:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    accountStatus:{
        type:String,
        required:true,
        default:'Inactiva'
    },
    role:{
        type:String,
        required:true,
        default:"Student"
    }

});

module.exports = model('user', user);