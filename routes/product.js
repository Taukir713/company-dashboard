const express = require("express");
const router = express.Router({mergeParams:true}); 
const { validateProduct ,isAdminOnly } = require("../Middleware"); 
const productController = require("../controller/product");
const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError")

router.param("productId", (req, res, next, id) => { 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ExpressError(400, "Invalid ID"));
    } 
    next();
});

//Add Product
router.route("/")
    .get(isAdminOnly,productController.getProduct)
    .post(isAdminOnly,  validateProduct,productController.addProduct)

//Edit Product
router.get("/:productId/edit" ,isAdminOnly, productController.editProduct)
 
//Update Product //Delete Product
router.route("/:productId")
    .patch(isAdminOnly,  validateProduct, productController.updateProduct)
    .delete( isAdminOnly, productController.deleteProduct )

module.exports = router