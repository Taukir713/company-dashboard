const Product = require("../model/product"); 
const CompanyEntry = require("../model/companyEntry");
const ExpressError = require("../utils/ExpressError");
const getPagination = require("../utils/pagination");
const Company = require("../model/company");

module.exports.index = async(req,res) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const q = req.query.q; 
    const {skip} = getPagination(page, limit);  

    if(q.length) {
        const company = await Company.findOne({name:{$regex:q , $options:"i"}});
        // const company = await Company.findOne({name: q });
        if(company) {
            const companyEntries = await CompanyEntry.find({companyId:company._id}).populate("companyId").populate("productId").skip(skip).limit(limit).sort({_id: -1}); 
            const totalEntries = await CompanyEntry.countDocuments({companyId:company._id});
            const totalPages = Math.ceil(totalEntries/limit) || 1;
            res.json({success:true, message:"Company Entry Fetched Successfully", companyEntries, currentPage:page, totalEntries, totalPages})
            return;
        }else {
            res.json({success:true, message:"Company Entry Not Found", companyEntries:[], currentPage:page,  totalPages:1})
            return
        } 
    }   
    const companyEntries = await CompanyEntry.find().populate("companyId").populate("productId").skip(skip).limit(limit).sort({_id: -1}); 

    const totalEntries = await CompanyEntry.countDocuments();
    const totalPages = Math.ceil(totalEntries/limit) || 1;

    res.json({success:true, message:"Company Entry   Fetched Successfully", companyEntries, currentPage:page, totalEntries, totalPages})
}

module.exports.addCompanyEntry = async(req,res) => {
    const {productId ,qty  } = req.body;  
    const product = await Product.findById(productId); 
    if(!product) throw new ExpressError(404, "Product Not Found")
    req.body.price = product.price
    req.body.total = qty * product.price;
    const newCompanyEntry = await  CompanyEntry.create(req.body);
    res.json({success: true, message: "New Entry Added" , newCompanyEntry})
}

module.exports.editCompanyEntry =  async(req,res) => {
    const {id} = req.params; 
    const companyEntry = await CompanyEntry.findById(id).populate("companyId").populate("productId");
    if(!companyEntry) throw new ExpressError(404, "Company Entry Not Found")
    res.json({success:true, message:"Company Entry Data Fetched Successfully" , companyEntry})
}

module.exports.updateCompanyEntry = async(req,res) => {
    const {id} = req.params;  
    const {productId, qty } = req.body; 
      
    const product = await Product.findById(productId);
    if(!product) throw new ExpressError(404, "Product Not Found");
 
    req.body.price = product.price;
    req.body.total = qty * product.price; 
     
    const updatedCompanyEntry = await CompanyEntry.findByIdAndUpdate(id, req.body, {returnDocument: "after"}).populate("companyId").populate("productId");
    if(!updatedCompanyEntry) throw new ExpressError(404, "Company Entry Not Found")
    res.json({success:true, message: "Company Entry Updated ", updatedCompanyEntry} )

}

module.exports.deleteCompanyEntry = async(req,res) => {
    const {id} = req.params; 
    const deletedCompanyEntry = await CompanyEntry.findByIdAndDelete(id);
    if(!deletedCompanyEntry) throw new ExpressError(404, "Company Entry Not Found")
    res.json({success:true, message: "Company Entry Deleted" , deletedCompanyEntry})
}