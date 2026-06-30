const express = require("express");
const router = express.Router({mergeParams:true}); 
const {validateType ,isAdminOnly } = require("../Middleware"); 
const typeController = require("../controller/type");
const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError")



router.param("typeId", (req, res, next, id) => {  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log(id)
        return next(new ExpressError(400, "Invalid ID"));
    } 
    next();
})

//Add Component Type
router.route("/")
    .get(isAdminOnly,typeController.getComponentTypes)
    .post( isAdminOnly,  validateType, typeController.addComponentType) 

//Update Component Type //Delete Component Type
router.route("/:typeId") 
    .patch( isAdminOnly,  validateType , typeController.updateComponentType)
    .delete( isAdminOnly, typeController.deleteComponentType)

//Edit Component Type Route
router.get("/:typeId/edit", isAdminOnly, typeController.editComponentType )




module.exports = router;