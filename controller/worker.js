const Worker = require("../model/worker");
const ExpressError = require("../utils/ExpressError");

module.exports.index = async(req,res) => {
    const workers = await Worker.find(); 
    res.json({success:true, message: "Worker Data Fetched Successfully" , workers});
}

module.exports.addWorker = async(req,res) => {
    const worker = await Worker.findOne({name:req.body.name});
    if(worker) throw new ExpressError(409 , "Worker With This Name Already Exists")
    const newWorker = await Worker.create(req.body);
    res.json({success:true, message: "New Worker Added" , newWorker});
}

module.exports.editWorker = async(req,res) => {
    const {id} = req.params; 
    const worker = await Worker.findById(id);
    if(!worker) throw new ExpressError(404, "Worker Data Not Found");
    res.json({success: true, message: "Worker Data Fetched Successfully" , worker})
}

module.exports.updateWorker = async (req,res) => {
    const {id} = req.params; 
    const worker = await Worker.findOne({name:req.body.name, _id: {$ne:id}});
    if (worker) throw new ExpressError(409 , "Worker With This Name Already Exists")
        
    const updatedWorker = await Worker.findByIdAndUpdate(id,req.body, {returnDocument: "after"});
    if(!updatedWorker) throw new ExpressError(404, "Worker Data Not Found");
    res.json({success:true, message:"Worker Updated" , updatedWorker})
}

module.exports.deleteWorker =  async(req,res) => {
    const {id} = req.params; 
    const deletedWorker = await Worker.findByIdAndDelete(id );
    if(!deletedWorker) throw new ExpressError(400, "Worker Data Not Found");
    res.json({success: true, message: "Worker Deleted" , deletedWorker})
}