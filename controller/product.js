 const Company = require("../model/company"); 
const Product = require("../model/product");
const ExpressError = require("../utils/ExpressError"); 

module.exports.addProduct = async(req,res) => {
    const {id} = req.params;
    const company = await Company.findById(id).populate("product");
    const Exists = company.product.some((el) => (
        el.name.toLowerCase() === req.body.name.toLowerCase()
    ))
    if(Exists) {
        throw new ExpressError(409, "Product With This Name For This Company Already Exists!")
    }
    const product = await Product.create(req.body);
    company.product.push(product); 
    const updatedCompany = await company.save() 
    res.json({success:true, message:"New Product Added",product , updatedCompany  })
}

module.exports.getProduct = async(req,res) => {
        const {id} = req.params; 
    
        const company = await Company.findById(id).populate("product");
        if(!company) throw new ExpressError(404, "Company Data Not Found");
        
        res.json({success:true, message:"Product Data Fetched Successfully" , company , product:company.product})
    }

module.exports.editProduct =  async(req,res) => {
    const {id,productId} = req.params; 

    const company = await Company.findById(id).populate("product");
    if(!company) throw new ExpressError(404, "Company Data Not Found");

    const product = await Product.findById(productId);
    if(!product) throw new ExpressError(404, "Product Data Not Found")
    res.json({success:true, message:"Product Data Fetched Successfully" , product, company})
}

module.exports.updateProduct = async(req,res) => {
    const {id, productId} = req.params; 
    const name = req.body.name?.toLowerCase();

    const company = await Company.findById(id).populate("product");
    if(!company) throw new ExpressError(404, "Company Data Not Found");
     
    const Exists = company.product.some((el ) => (  
        el.name.toLowerCase() === name &&
        el._id.toString() !== productId 

    ))  
    if(Exists) throw new ExpressError(409 , "Product With This Name For This Company Already Exists")
    
    const updatedProduct = await Product.findByIdAndUpdate(productId,req.body, {returnDocument:"after"});
    if(!updatedProduct) throw new ExpressError(404, "Product Data Not Found")
    
    res.json({success:true, message:"product updated" , updatedProduct , company})
     
}

module.exports.deleteProduct = async(req,res) => {
    const {id , productId} = req.params; 
    const deleteProduct = await Product.findByIdAndDelete(productId);
    const updatedCompany = await Company.findByIdAndUpdate(id, {$pull: {product: productId}} , {returnDocument:"after"})
    if(!deleteProduct || !updatedCompany) {
        throw new ExpressError(404, "Product or Company Data Not Found")
    }
    res.json({success: true, message:"product deleted" , deleteProduct,updatedCompany})
}