const mongoose = require("mongoose");
const {Schema , model} = mongoose; 

const assemblerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
    
})

const Assembler = model("Assembler" , assemblerSchema);
module.exports = Assembler;