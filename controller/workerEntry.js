const Worker = require("../model/worker");
const WorkerEntry = require("../model/workerEntry");
const ExpressError = require("../utils/ExpressError"); 
const getPagination = require("../utils/pagination");

module.exports.index = async(req,res) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const q = req.query.q;
    
    const {skip } = getPagination(page,limit); 
    if(q.length) {
        const worker = await Worker.findOne({name:{$regex: q , $options:"i"}});
        // const worker = await Worker.findOne({name: q });
        if(worker) {
            const workerEntries = await WorkerEntry.find({workerId:worker._id}).populate("workerId").skip(skip).limit(limit).sort({_id: -1});
            const totalEntries = await  WorkerEntry.countDocuments({workerId:worker._id});
            const totalPages = Math.ceil(totalEntries/limit) || 1;  

            res.json({success:true, message: "Worker Entry Fetched Successfully" , workerEntries , currentPage: page, totalEntries, totalPages})
            return
        } else {
            res.json({success:true, message: "Worker Entry Not Found" , workerEntries:[] , currentPage: page, totalPages:1})
            return
        }
    }
    
    const workerEntries = await WorkerEntry.find().populate("workerId").skip(skip).limit(limit).sort({_id: -1}); 
    
    const totalEntries = await WorkerEntry.countDocuments();
    const totalPages = Math.ceil(totalEntries/limit) || 1;  

    res.json({success:true, message: "Worker Entry Fetched Successfully" , workerEntries , currentPage: page, totalEntries, totalPages})
}

module.exports.addWorkerEntry = async(req,res) => { 
    const {workerId, workedHours ,date } = req.body; 

    const worker = await Worker.findById(workerId);
    if(!worker) throw new ExpressError(404, "Worker Not Found");

    const start = new Date(date);
    start.setHours(0,0,0,0);

    const end = new Date(date);
    end.setHours(23,59,59,999);

    const workerEntry = await WorkerEntry.find({workerId, date: {$gte: start , $lt: end}});
    if(workerEntry.length) {
        throw new ExpressError(409, "Worker's Entry Already Exist For This Date ")
    }

    req.body.hourlyRate = worker.hourlyRate;
    req.body.total = workedHours * worker.hourlyRate;
    const newWorkerEntry = await WorkerEntry.create(req.body);
    res.json({success:true, message: "Worker Entry Added", newWorkerEntry}); 
}

module.exports.editWorkerEntry =  async(req,res) => {
    const {id} = req.params; 
    const workerEntry = await WorkerEntry.findById(id).populate("workerId");
    if(!workerEntry) throw new ExpressError(404, "Worker Entry Not Found");
    res.json({success:true, message: "Worker Entry Fetched Successfully" , workerEntry});
}

module.exports.updateWorkerEntry =  async (req,res) => {
    const {id} = req.params;
    const {workerId, workedHours ,date} = req.body;  
 
    const worker = await Worker.findById(workerId);
    if(!worker) throw new ExpressError(404, "Worker Not Found");   

    const entry = await WorkerEntry.findById(id); 
    const entryDate = entry.date?.toISOString().split("T")[0]; 
    
    const workerEntries = await WorkerEntry.find({workerId , _id:{$ne : id}}); 
    workerEntries?.forEach(entry => { 
        const workerEntryDate = entry.date?.toISOString().split("T")[0]   
 
        if(workerEntryDate  === entryDate ) { 
            throw new ExpressError(409, "A Worker Entry Already Exists For This Date")
        }  
    })
 
    req.body.hourlyRate = worker.hourlyRate;
    req.body.total = workedHours * worker.hourlyRate;
    const updatedWorkerEntry = await WorkerEntry.findByIdAndUpdate(id, req.body, {returnDocument:"after"});
    if(!updatedWorkerEntry) throw new ExpressError(404 , "Worker Entry Not Found")
    res.json({success:true, message:"Worker Entry Updated" , updatedWorkerEntry })
}

module.exports.deleteWorkerEntry = async(req,res) => {
    const {id} = req.params; 
    const deletedWorkerEntry = await WorkerEntry.findByIdAndDelete(id);
    if(!deletedWorkerEntry) throw new ExpressError(404 , "Worker Entry Not Found"); 
    res.json({success:true, message: "Worker Entry Deleted" , deletedWorkerEntry})
}