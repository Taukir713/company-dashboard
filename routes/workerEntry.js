const mongoose = require("mongoose");
const express = require("express");
const router = express.Router({mergeParams:true}); 
const {validateWorkerEntry ,isManagerOnly } = require("../Middleware") 
const workerEntryController = require("../controller/workerEntry");
const ExpressError = require("../utils/ExpressError")

router.param("id", (req, res, next, id) => { 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ExpressError(400, "Invalid ID"));
    } 
    next(); 
})

//Get Worker Entry //Add Worker Entry
router.route("/")
    .get(isManagerOnly, workerEntryController.index)
    .post( isManagerOnly, validateWorkerEntry, workerEntryController.addWorkerEntry )

//Get Worker Entry 1  //Update Worker Entry //Delete Worker Entry
router.route("/:id")
    .patch( isManagerOnly,  validateWorkerEntry, workerEntryController.updateWorkerEntry)
    .delete( isManagerOnly,  workerEntryController.deleteWorkerEntry )

//Edit Worker Entry
router.get("/:id/edit" , isManagerOnly,workerEntryController.editWorkerEntry )

module.exports = router;