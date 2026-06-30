const express = require("express");
const router = express.Router({mergeParams:true});  
const {validateComponent , isAdminOnly, isApprovedUserOnly  } = require("../Middleware"); 
const componentController = require("../controller/component");
const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError")

router.param("id", (req, res, next, id) => { 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ExpressError(400, "Invalid ID"));
    } 
    next();
});

//Get Component //Add Component
router.route("/")
    .get( isApprovedUserOnly, componentController.index )
    .post(isAdminOnly,  validateComponent, componentController.addComponent )

//Edit Component
router.get("/:id/edit" , isAdminOnly, componentController.editComponent)

//Update Component //Show Component //Delete Component
router.route("/:id")
    .patch( isAdminOnly, validateComponent, componentController.updateComponent)
    .delete(isAdminOnly,  componentController.deleteComponent)

module.exports = router