const mongoose = require("mongoose");
const {Schema , model} = mongoose;

const workerSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    hourlyRate: {
        type: Number,
        required: true
    }
    
})

const Worker = model("Worker" , workerSchema);
module.exports = Worker;