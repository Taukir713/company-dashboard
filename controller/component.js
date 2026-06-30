const Component = require("../model/component"); 
const ExpressError = require("../utils/ExpressError");

module.exports.index = async(req,res) => {
    const components = await Component.find().populate("type") ; 
    res.json({success:true, message: "Component Data Fetched Successfully" , components});
}

module.exports.addComponent = async(req,res) => {
    const component = await Component.findOne({name:req.body.name});
    if(component) throw new ExpressError(409, "Component With This Name Already Exists");
    const newComponent = await Component.create(req.body);
    res.json({success:true, message: "Component Added" , newComponent})
} 

module.exports.editComponent = async(req,res) => {
    const {id} = req.params;
    const component = await Component.findById(id);
    if(!component) throw new ExpressError(404, "Component Data Not Found");
    res.json({success:true, message:"Component Data Fetched Successfully", component});
}

module.exports.updateComponent = async(req,res) => {
    const {id} = req.params;
    const component = await Component.findOne({name:req.body.name,_id: {$ne:id}});
    if(component) throw new ExpressError(409, "Component With This Name Already Exists");
    const updatedComponent = await Component.findByIdAndUpdate(id,req.body,{returnDocument:"after"});
    res.json({success:true, message:"Component Updated", updatedComponent});
}

module.exports.deleteComponent =  async(req,res) => {
    const {id} = req.params;
    const deletedComponent = await Component.findByIdAndDelete(id);
    if(!deletedComponent) throw new ExpressError(404, "Component Data Not Found");
    res.json({success:true, message: "Component Deleted", deletedComponent}); 
}