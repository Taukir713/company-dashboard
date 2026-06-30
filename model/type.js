const mongoose = require("mongoose");
const {Schema , model} = mongoose;

const typeSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    price: {
        type: Number,
        required: true
    }
    
})

const Type = model("Type" , typeSchema);
module.exports = Type;