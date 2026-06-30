const passport = require("passport");
const User = require("../model/user");
const ExpressError = require("../utils/ExpressError");

module.exports.signup = async(req,res,next) => {
    try {
        const {username ,password ,email  } = req.body; 

        const user = await User.findOne({username});  
        const userWithPendingRole = await User.findOne({email,status:"pending"}); 
        if(userWithPendingRole) {
            res.json({success:true, message:"Request Sent To Admin, Wait For Approval"})
            return
        }else if(user ) {
            throw new ExpressError(409, "User With This Username Already Exist")
        } 
        
        const usedEmail = await User.findOne({email});
        if(usedEmail) throw new ExpressError(409, " Use Another Email ,Not Allowed to Signup With The Same Email.")

        const newUser = new User({username , email  }); 

        const registeredUser = await User.register(newUser ,password);  
        res.json({success:true, message:"Request Sent To Admin, Wait For Approval" });
        
    
    } catch(err) {
       if(err) return next(err)
    }
    
}

module.exports.login = async (req, res,next) => {
    passport.authenticate("local" , (err,user,info) => {
        if(err) return next(err);
        if(!user){ 
           return res.status(401).json({success:false , message:"Username or Password is Incorrect"})
        }
        req.login(user, (err) => { 
            if(err) return next(err); 
            if(user.status == "rejected") {
                req.logout(() => {})
                return res.status(403).json({success:false , message:"Your Request Has Been Rejected By Admin."}) 
            }
            if(user.status !== "approved") {
                req.logout(() => {})
                return res.status(403).json({success:false , message:"Request Doesn't Approved Yet."}) 
            }
            res.json({success:true , message:"User Logged In" , user})
        })
    })(req,res,next)
}

module.exports.logout = async(req,res,next) => {
    req.logout( (err) => {
       if (err) return next(err)
        res.json({success:true, message:"User Logged Out",  });
    })
}

module.exports.me =  async(req,res) => { 
    if(req.user) { 
        return res.json({success:true , message:"User Found" , user: req.user})
    }
    res.json({success:false , message: "User Not Found"})
}

module.exports.getApprovedUsers = async(req,res) => {
    const users = await User.find({status : {$eq : "approved"}});
    res.json({success:true, message:"Users Fetched Successfully", users})
}

module.exports.getPendingUsers = async(req,res) => {
    const pendingUsers = await User.find({status: "pending"});
    res.json({success:true , message:"Pending Request Fetched Successfully" , pendingUsers})
} 

module.exports.updateUserAccess = async(req,res) => {
    const {id} = req.params; 
    const updatedUser = await User.findByIdAndUpdate(id, req.body , {returnDocument:"after"}); 
    if(!updatedUser) throw new ExpressError(404, "User Not Found");
    res.json({success:true , message: "User role Updated" , updatedUser}) 
}

module.exports.updateUser = async(req,res) => {
    const {id} = req.params; 
    const updatedUser = await User.findByIdAndUpdate(id, req.body , {returnDocument:"after"}); 
    if(!updatedUser) throw new ExpressError(404, "User Not Found");
    res.json({success:true , message: "User theme Updated" , updatedUser}) 
}

