const express = require("express");
const router = express.Router({mergeParams:true});   
const {validateUser, isAdminOnly ,isManagerOnly, isApprovedUserOnly,checkApprovedUser } = require("../Middleware"); 
const passport = require("passport");
const userController = require("../controller/user");
const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError")

router.param("id", (req, res, next, id) => { 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ExpressError(400, "Invalid ID"));
    } 
    next();
});

router.post("/signup" , validateUser , userController.signup )

router.post("/login" , userController.login)

router.post("/logout" , isApprovedUserOnly , userController.logout )

router.get("/me" ,isApprovedUserOnly, userController.me)

router.get("/approved-users" ,isAdminOnly,  userController.getApprovedUsers)

router.get("/pending-users" ,   isAdminOnly, userController.getPendingUsers)

router.patch("/update-user-access/:id" , isAdminOnly, userController.updateUserAccess)

router.patch("/update-user/:id" , isApprovedUserOnly, userController.updateUser )


module.exports = router;