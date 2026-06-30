const express = require("express");
const router = express.Router({mergeParams:true}); 
const {validateAssemblerEntry ,    isManagerOnly  } = require("../Middleware");
const assemblerEntryController = require("../controller/assemblerEntry");
const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError")

router.param("id", (req, res, next, id) => { 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ExpressError(400, "Invalid ID"));
    } 
    next();
});

//Get Assembler Entry //Add Assembler Entry 
router.route("/") 
    .get(isManagerOnly, assemblerEntryController.index)
    .post( isManagerOnly,  validateAssemblerEntry ,assemblerEntryController.addAssemblerEntry)

//Get Assembler Entry 1 //Update Assembler Entry //Delete Assembler Entry
router.route("/:id")
    .patch(isManagerOnly, validateAssemblerEntry, assemblerEntryController.updateAssemblerEntry)
    .delete(isManagerOnly,   assemblerEntryController.deleteAssemblerEntry)


//Edit Assembler Entry
router.get("/:id/edit" , isManagerOnly, assemblerEntryController.editAssemblerEntry)

 
module.exports = router;