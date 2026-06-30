const Assembler = require("../model/assembler"); 
const ExpressError = require("../utils/ExpressError");

module.exports.index =  async(req,res) => {
    const assemblers = await Assembler.find();  
    res.json({success:true , message: "Assemblers Data Fetched Successfully" , assemblers});
}

module.exports.addAssembler = async(req,res) => {
    const assembler = await Assembler.findOne({name: req.body.name});
    if(assembler) throw new ExpressError(409, "Assembler with This Name Already Exists");
    const newAssembler = await Assembler.create(req.body);
    res.json({success:true, message:"New Assembler Added", newAssembler});
}

module.exports.editAssembler = async(req,res) => {
    const {id} = req.params;
    const assembler = await Assembler.findById(id);
    if(!assembler) throw new ExpressError(404, "Assembler Data Not Found");
    res.json({success:true, message:"Assembler Data Fetched Successflly" , assembler})
}

module.exports.updateAssembler = async(req,res) => {
    const {id} = req.params;

    const assembler = await Assembler.findOne({name:req.body.name,_id: {$ne:id}});
    if(assembler) throw new ExpressError(409,  "Assembler with This Name Already Exists");

    const updatedAssembler = await Assembler.findByIdAndUpdate(id, req.body, {returnDocument:"after"});
    if(!updatedAssembler) throw new ExpressError(404, "Assembler Data Not Found");
    res.json({success:true, message:"Assembler Updated" , updatedAssembler});
}

module.exports.deleteAssembler  = async(req,res) => {
    const {id} = req.params;
    const deletedAssembler = await Assembler.findByIdAndDelete(id);
    if(!deletedAssembler) throw new ExpressError(404, "Assembler Data Not Found");
    res.json({success: true, message: "Assembler Deleted" , deletedAssembler});
}

 

