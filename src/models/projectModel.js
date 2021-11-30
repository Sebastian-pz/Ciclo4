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
    general_objective:{
        type:String
    },
    specific_objectives:{
        type:String
    },
    budget:{
        type:Number
    },
    leader:{
        type: String,
        required:true
    },
    members:[{
        ref:"user",
        type: Schema.Types.ObjectId
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