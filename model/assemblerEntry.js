const mongoose = require("mongoose"); 
const {Schema , model} = mongoose; 
const Assembler = require("./assembler");
const Component = require("./component");
const Type = require("./type");

const assemblerEntry = new Schema({
    assemblerId: {
        type: Schema.Types.ObjectId,
        ref: "Assembler",
        required: true
    },
    componentId: {
        type: Schema.Types.ObjectId,
        ref: "Component",
        required: true
    },
    typeId: {
        type: Schema.Types.ObjectId,
        ref: "Type",
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    retrieve: {
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

const AssemblerEntry = model("AssemblerEntry" , assemblerEntry);
module.exports = AssemblerEntry;