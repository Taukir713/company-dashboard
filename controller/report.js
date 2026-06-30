const AssemblerEntry = require("../model/assemblerEntry"); 
const companyEntry = require("../model/companyEntry");
const workerEntry = require("../model/workerEntry");
const ExpressError = require("../utils/ExpressError");

module.exports.getReports = async(req,res) => { 
    const type = req.query.type; 
    const month = Number(req.query.month)  ;
    const year = Number(req.query.year)  ;

    const startDate = new Date(year,month-1,1);
    const endDate = new Date(year,month,1); 

    if(req.query.type === "company") { 
        const reports = await companyEntry.aggregate([ {$match:{date:{$gte:startDate , $lt:endDate}}} , {$group:{_id:"$companyId" , totalQty:{$sum: "$qty"} , totalAmount:{$sum:"$total"}}} , {$lookup : {from:"companies" , localField:"_id" ,foreignField:"_id",as:"company"}}] )  
        return res.json({success:true ,reports  })
    }

    if(req.query.type === "assembler") { 
        const reports = await AssemblerEntry.aggregate([ {$match:{date:{$gte:startDate , $lt:endDate}}} , {$group:{_id:"$assemblerId" , totalQty:{$sum: "$qty"} , totalAmount:{$sum:"$total"} }}, {$lookup : {from:"assemblers" , localField:"_id" ,foreignField:"_id",as:"assembler"}}])  
        return res.json({success:true ,reports  })
    }
    
    if(req.query.type === "worker") { 
        const reports = await workerEntry.aggregate([ {$match:{date:{$gte:startDate , $lt:endDate}}} , {$group:{_id:"$workerId" , totalHours:{$sum: "$workedHours"} , totalAmount:{$sum:"$total"}}}, {$lookup : {from:"workers" , localField:"_id" ,foreignField:"_id",as:"worker"}}])  
        return res.json({success:true ,reports  })
    } 

    res.json({success:true, reports:[]})
}