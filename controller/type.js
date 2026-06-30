const Component = require("../model/component"); 
const Type = require("../model/type"); 
const ExpressError = require("../utils/ExpressError");

module.exports.addComponentType = async(req,res) => {
    const {id} = req.params;
    let component = await Component.findById(id).populate("type")
    if(!component) throw new ExpressError(404, "Component Data Not Found");
    const exists = component.type.some((el) => (
        el.name === req.body.name
    ))
    if(exists) throw new ExpressError(409, "Type With This Name For This Component Already Exists");
    const type = await Type.create(req.body); 
    component.type.push(type);
    component = await component.save()
    res.json({success:true, message: "Type Added", component,type})
} 

module.exports.getComponentTypes = async(req,res) => {
        const {id} = req.params; 
    
        const component = await Component.findById(id).populate("type");
        if(!component) throw new ExpressError(404, "Component Data Not Found");
        
        res.json({success:true, message:"Type Data Fetched Successfully" , component , types:component.type})
    } 

module.exports.editComponentType = async(req,res) => {
    const {id , typeId} = req.params;
    const component = await Component.findById(id).populate("type");
    if(!component) throw new ExpressError(404, "Component Not Found");

    const type = await Type.findById(typeId);
    if(!type) throw new ExpressError(404, "Type Not Found");

    res.json({success:true, message:"Component And Type Data Fetched Successfully" , component,type})
}

module.exports.updateComponentType = async(req,res) => {
    const {id, typeId} = req.params;

    let component = await Component.findById(id).populate("type");
    if(!component) throw new ExpressError(404, "Component Not Found");

    const updatedType = await Type.findByIdAndUpdate(typeId, req.body, {returnDocument:"after"});
    if(!updatedType) throw new ExpressError(404, "Data Not Found");
    component = await component.save();
    res.json({success:true, message: "Component Type Updated", component , updatedType});
}

module.exports.deleteComponentType = async(req,res) => {
    const {id , typeId} = req.params;
    const updatedComponent = await Component.findByIdAndUpdate(id , {$pull : {type : typeId} } , {returnDocument:"after"} );
    const deletedType = await Type.findByIdAndDelete(typeId);
    res.json({success:true, message:"Component Type Deleted" , updatedComponent,deletedType});
}