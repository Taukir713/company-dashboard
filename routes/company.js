const express = require("express");
const router = express.Router({mergeParams:true});  
const {validateCompany , isAdminOnly, isApprovedUserOnly } = require("../Middleware"); 
const companyController = require("../controller/company");
const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError")

router.param("id", (req, res, next, id) => { 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ExpressError(400, "Invalid ID"));
    } 
    next();
});

//Get Company //Add Company
router.route("/")
    .get(isApprovedUserOnly, companyController.index )
    .post( isAdminOnly, validateCompany, companyController.addCompany)

//Edit Company
router.get( "/:id/edit"  ,isAdminOnly,  companyController.editCompany)

//Update Company //Delete Company
router.route("/:id")
    .patch(isAdminOnly,  validateCompany, companyController.updateCompany)
    .delete(isAdminOnly,     companyController.deleteCompany)

module.exports = router;