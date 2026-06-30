const Assembler = require("../model/assembler"); 
const Component = require("../model/component"); 
const Type = require("../model/type"); 
const AssemblerEntry = require("../model/assemblerEntry"); 
const ExpressError = require("../utils/ExpressError");
const getPagination = require("../utils/pagination"); 
 
module.exports.index = async(req,res) => { 
    const page = Number(req.query.page);
    const limit = Number(req.query.limit); 
    const q = req.query.q;   
    const {skip} = getPagination(page, limit); 
    if(q.length) {  
        const assembler = await Assembler.findOne({name:{$regex:q , $options:"i"}});
        // const assembler = await Assembler.findOne({name:q});
        if(assembler) { 
            const assemblerEntries = await AssemblerEntry.find({assemblerId :assembler._id}).populate("assemblerId").populate("componentId").populate("typeId").skip(skip).limit(limit).sort({_id: -1}) ;
            const totalEntries = await AssemblerEntry.countDocuments({assemblerId:assembler._id});
            const totalPages = Math.ceil(totalEntries/limit) || 1;
            res.json({success:true, message:"Assembler Entry Data Fetched Successfully" , assemblerEntries , currentPage:page ,totalEntries ,totalPages});
            return
        }else {
            res.json({success:true, message:"Assembler Entry Not Found" , assemblerEntries:[] , currentPage:page  ,totalPages:1});
            return
        }
        
    }
     
    const assemblerEntries = await AssemblerEntry.find().populate("assemblerId").populate("componentId").populate("typeId").skip(skip).limit(limit).sort({_id: -1}) ;

    const totalEntries = await AssemblerEntry.countDocuments();
    const totalPages = Math.ceil(totalEntries/limit) || 1;

    res.json({success:true, message:"Assembler Entry Data Fetched Successfully" , assemblerEntries , currentPage:page ,totalEntries ,totalPages});
      
}

module.exports.addAssemblerEntry = async(req,res) => { 
    const {assemblerId,componentId,typeId,qty} = req.body;
    const assembler = await Assembler.findById(assemblerId);
    if(!assembler) throw new ExpressError(404, "Assembler Not Found");

    const component = await Component.findById(componentId);
    if(!component) throw new ExpressError(404, "Component Not Found");

    const type = await Type.findById(typeId);
    if(!type) throw new ExpressError(404, "Type Not Found");

    req.body.price = type.price;
    req.body.total = qty * type.price;
    const newAssemblerEntry = await AssemblerEntry.create(req.body);
    res.json({success:true, message:"New Assembler Entry Added" , newAssemblerEntry});
}

module.exports.editAssemblerEntry = async(req,res) => {
    const {id} = req.params;
    const assemblerEntry = await AssemblerEntry.findById(id).populate("assemblerId").populate("componentId").populate("typeId");
    if(!assemblerEntry) throw new ExpressError(404, "Assembler Entry Not Found");
    res.json({success:true, message:" Assembler Entry Data Fetched Successfully" , assemblerEntry});
}

module.exports.updateAssemblerEntry = async(req,res) => {
    const {id} = req.params;
    const {assemblerId,componentId,typeId,qty} = req.body;

    const assembler = await Assembler.findById(assemblerId);
    if(!assembler) throw new ExpressError(404, "Assembler Not Found");

    const component = await Component.findById(componentId);
    if(!component) throw new ExpressError(404, "Component Not Found");

    const type = await Type.findById(typeId);
    if(!type) throw new ExpressError(404, "Type Not Found");

    req.body.price = type.price;
    req.body.total = qty * type.price;
    const updateAssemblerEntry = await AssemblerEntry.findByIdAndUpdate(id, req.body , {returnDocument:"after"});
    if(!updateAssemblerEntry) throw new ExpressError(404, "Assembler Entry Not Found")
    res.json({success:true, message:"Assembler Entry Updated" , updateAssemblerEntry})
}

module.exports.deleteAssemblerEntry = async(req,res) => {
    const {id} = req.params;
    const deletedAssemblerEntry = await AssemblerEntry.findByIdAndDelete(id);
    if(!deletedAssemblerEntry) throw new ExpressError(404, "Assembler Entry Not Found");
    res.json({success:true , message:"Assembler Entry Deleted" , deletedAssemblerEntry});
}
 

 