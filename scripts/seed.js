if (process.env.NODE_ENV != "production") {
    require("dotenv" ).config({quiet: true})
} 
const mongoose = require("mongoose");
const User = require("../model/user"); 

const seedAdmin = async () => {
    const existingAdmin = await User.findOne({ email: process.env.SEEDADMINEMAIL });
    if (existingAdmin) {
        console.log("Admin already exists. Skipping...");
        return;
        
    } 
    const password = process.env.SEEDADMINPASSWORD ;
    const user = new User({
        username: process.env.SEEDADMINUSERNAME,
        email: process.env.SEEDADMINEMAIL, 
        status: "approved",
        role: "admin"
    });

    const registeredUser = await User.register(user ,password);  
    console.log(registeredUser)
};

const runSeed = async () => {
    try {
        await mongoose.connect(process.env.ATLASDB_URL);  
        await seedAdmin(); 
        await mongoose.disconnect();
 
    } catch (error) {
        console.log(error)
        console.error(error.stack) 
    }
};

runSeed()