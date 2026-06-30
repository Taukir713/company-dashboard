const mongoose = require("mongoose");
const {Schema , model} = mongoose;
const passportLocalMongoose = require('passport-local-mongoose').default;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: [ "admin" , "manager" , "viewer"], 
        default: null
    }, 
    status: {
        type: String,
        enum: ["approved" , "pending" , "rejected"],
        default: "pending"
    } ,
    theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light"
    }
    
})

userSchema.plugin(passportLocalMongoose)

const User = model("User" , userSchema);
module.exports = User;