const express = require("express");
const router = express.Router({mergeParams:true});  
const {validateAssembler ,isAdminOnly , isApprovedUserOnly,isManagerOnly , checkApprovedUser } = require("../Middleware"); 
const assemblerController = require("../controller/assembler");
const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError")

router.param("id", (req, res, next, id) => { 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ExpressError(400, "Invalid ID"));
    } 
    next();
});

//Get Assembler //Add Assembler
router.route("/")
    .get( isApprovedUserOnly,  assemblerController.index)
    .post(isAdminOnly,   validateAssembler , assemblerController.addAssembler);

//Show Assembler 1 //Update Assembler //Delete Assemnler
router.route("/:id")
    .patch(isAdminOnly,   validateAssembler, assemblerController.updateAssembler)
    .delete(isAdminOnly,   assemblerController.deleteAssembler)

//Edit Assembler
router.get("/:id/edit" , isAdminOnly,  assemblerController.editAssembler)

module.exports = router;