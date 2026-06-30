const mongoose = require("mongoose");
const express = require("express");
const router = express.Router({mergeParams:true}); 
const {validateWorker ,isAdminOnly, isApprovedUserOnly  } = require("../Middleware") 
const workerController = require("../controller/worker");
const ExpressError = require("../utils/ExpressError")

router.param("id", (req, res, next, id) => { 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ExpressError(400, "Invalid ID"));
    } 
    next();
});

//Get Workers //Add Workers 
router.route("/")
    .get(isApprovedUserOnly,workerController.index ) 
    .post( isAdminOnly, validateWorker , workerController.addWorker )

//Edit Worker
router.get("/:id/edit" , isAdminOnly, workerController.editWorker )

//Update Worker //Delete Worker
router.route("/:id")
    .patch( isAdminOnly, validateWorker, workerController.updateWorker ) 
    .delete( isAdminOnly,  workerController.deleteWorker)

module.exports = router;