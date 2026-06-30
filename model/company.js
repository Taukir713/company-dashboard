const mongoose = require("mongoose");
const {Schema , model} = mongoose;
const Product = require("./product")

const companySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    product: [
        {
           type: Schema.Types.ObjectId,
           ref: "Product"
        } 
    ]
    
})

const Company = model("Company" , companySchema);
module.exports = Company;

