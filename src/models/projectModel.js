const {Schema, model} = require('mongoose');

const project = new Schema({
    id:{
        type:String,
        unique: true,
        required:true
    },
    title: {
        type: String,
        unique : true,
        required : true
    },
    description: {
        type:String,
        default: "Aquí va la descripción del proyecto"
    },
    general_objective:{
        type:String
    },
    specific_objectives:{
        type:String
    },
    progress:[{
        progress:String,
        author:String,
        comment:String
    }],
    budget:{
        type:Number
    },
    leader:{
        type: String,
        required:true,
        unique:false
    },
    members:[{
        type:String
    }],
    pending_approval:[{
        type:String,
        default:['1']
    }],
    startDate:{
        type: Date,
        default: new Date()
    },
    isActive:{
        type: Boolean,
        default: false
    },
    projectStatus:{
        type:String,
        default: "null"
    }
},
    {
        timestamps:true
    }
);

module.exports = model('project', project);