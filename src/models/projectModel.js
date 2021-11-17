const {Schema, model} = require('mongoose');

const project = new Schema({
    title: {
        type: String,
        unique : true,
        required : true
    },
    description: {
        type: String
    },
    leader:{
        type: String,
        required:true,
        unique : true
    },
    members:{
        type: [String],
    },
    startDate:{
        type: Date,
        default: new Date()
    },
    isActive:{
        type: Boolean,
        default: true
    }
});

module.exports = model('project', project);