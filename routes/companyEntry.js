const express = require("express");
const router = express.Router({mergeParams: true});  
const {validateEntry,isManagerOnly  } = require("../Middleware");
const companyEntryController = require("../controller/companyEntry");
const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError")

router.param("id", (req, res, next, id) => { 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ExpressError(400, "Invalid ID"));
    } 
    next();
});

//Get Company Entry //Add Company Entry
router.route("/")
    .get( isManagerOnly, companyEntryController.index )
    .post(isManagerOnly,  validateEntry ,  companyEntryController.addCompanyEntry)

//Edit Company Entry
router.get("/:id/edit" , isManagerOnly,  companyEntryController.editCompanyEntry)

//Update Company Entry //Delete Route
router.route("/:id")
    .patch(isManagerOnly,   validateEntry, companyEntryController.updateCompanyEntry )
    .delete( isManagerOnly,  companyEntryController.deleteCompanyEntry)

module.exports = router;