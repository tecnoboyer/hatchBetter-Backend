
const { Schema, model } = require('mongoose');

const TaskSchema = Schema({
    description: {
        type: String,
        required: [true, 'Description is mandatory']
    },
    status:{
        type: Boolean,

    },
    { timestamps: true }
    
});



module.exports = model( 'Task', TaskSchema );