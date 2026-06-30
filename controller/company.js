const Company = require("../model/company"); 
const ExpressError = require("../utils/ExpressError");

module.exports.index = async (req,res) => { 
    const companies = await Company.find().populate("product"); 
    res.json({success:true, message:"Company Data Fetched Successfully", companies})
}

module.exports.addCompany =  async (req,res) => { 
    const company = await Company.findOne({name:req.body.name});
    if(company) {
        throw new ExpressError(409 , "Company With This Name Already Exists!")
    }
    const newCompany = await Company.create(req.body);
    res.json({success:true, message:"New Company Added" , newCompany})
    
}

module.exports.editCompany =  async(req,res) => {
    const {id} = req.params;
    const company = await Company.findById(id);
    if (!company) throw new ExpressError(404, "Company Data Not Found");
    res.json({success:true, message:"Company Data Fetched Successfully" , company});
}

module.exports.updateCompany =  async(req,res) => {
    const {id} = req.params; 
    
    const company = await Company.findOne({name:req.body.name,_id: {$ne:id}}); 
    if(company) throw new ExpressError(409,  "Company with This Name Already Exists");

    const updatedCompany = await Company.findByIdAndUpdate(id, req.body,{ returnDocument:"after"} );
    if(!updatedCompany) throw new ExpressError(404, "Company Data Not Found")
    res.json({success:true, message:"Company Name updated" , updatedCompany})
}

module.exports.deleteCompany = async(req,res) => {
    const {id} = req.params; 
    const deletedCompany = await Company.findByIdAndDelete(id);
    if(!deletedCompany) throw new ExpressError(404 , "Company Data Not Found")
    res.json({success:true, message:"Company Deleted " , deletedCompany})
}
