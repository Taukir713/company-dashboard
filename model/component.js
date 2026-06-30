const mongoose = require("mongoose");
const {Schema , model} = mongoose; 
const Type = require("./type");

const componentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }, 
    type: [{
        type: Schema.Types.ObjectId,
        ref: "Type"
    }]
    
})

const Component = model("Component" , componentSchema);
module.exports = Component;