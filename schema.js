const joi = require("joi");

// company schema
const companySchema = joi.object({
    name: joi.string().trim().required()
}).required()

// productSchema
const productSchema = joi.object({
    name: joi.string().trim().required(),
    price: joi.number().required()
}).required()

//Entry Schema
const entrySchema = joi.object({
    companyId: joi.string().hex().length(24).required(),
    productId: joi.string().hex().length(24).required(),
    qty: joi.number().required(),
    dispatch: joi.boolean(),
    date: joi.date().required()
}).required()

//Worker Schema
const workerSchema = joi.object({
    name: joi.string().trim().required(),
    hourlyRate: joi.number().required()
}).required()

// Worker Entry Schema
const workerEntrySchema = joi.object({
    workerId: joi.string().hex().length(24).required(),
    workedHours: joi.number().required(),
    date: joi.date().required()
}).required() 

//Assembler Schema 
const assemblerSchema = joi.object({
    name: joi.string().trim().required()
}).required()

const componentSchema = joi.object({
    name: joi.string().trim().required(),
    type: joi.array().items(
        joi.object({
            name: joi.string().trim().required(),
            price: joi.number().required()
        })
    )
}).required()

const typeSchema = joi.object({
    name: joi.string().trim().min(1).required(),
    price: joi.number().required()
})

const assemblerEntrySchema = joi.object({
    assemblerId: joi.string().hex().length(24).required(),
    componentId: joi.string().hex().length(24).required(),
    typeId: joi.string().hex().length(24).required(),
    qty: joi.number().min(1).required(),
    retrieve: joi.boolean(),
    date: joi.date().required()

}).required()

const userSchema = joi.object({
    username: joi.string().trim().required(),
    email: joi.string().trim().required(),
    password: joi.string().trim().min(8).required(), 
}).required() 

module.exports = {companySchema ,productSchema  ,entrySchema  
    ,workerSchema  , workerEntrySchema , assemblerSchema ,
    componentSchema , typeSchema , assemblerEntrySchema ,userSchema}; 