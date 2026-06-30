const mongoose = require("mongoose");
const {Schema , model} = mongoose;
const Worker = require("./worker");
const { Timestamp } = require("mongodb");

const workerEntrySchema = new Schema({
    workerId: {
        type: Schema.Types.ObjectId, 
        ref: "Worker",
        required: true
    },
    workedHours: {
        type: Number,
        required: true
    },
    hourlyRate: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true 
    }
} , {
    timestamps: true
})

const WorkerEntry = model("WorkerEntry" , workerEntrySchema);
module.exports = WorkerEntry;