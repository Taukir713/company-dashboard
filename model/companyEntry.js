const mongoose = require("mongoose"); 
const {Schema , model} = mongoose; 
const Company = require("./company");
const Product = require("./product");

const companyEntrySchema = new Schema({
    companyId: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    qty: {
        type: Number,
        required: true,
    },
    price : {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    dispatch: {
        type: Boolean,
        default: false, 
    },
    date: {
        type: Date,
        required: true 
    }
} , {
    timestamps: true
})

const CompanyEntry = model("CompanyEntry" , companyEntrySchema);
module.exports = CompanyEntry;