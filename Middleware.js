const {companySchema,productSchema  , entrySchema  
    ,  workerSchema   , workerEntrySchema , assemblerSchema,
    componentSchema,   typeSchema , assemblerEntrySchema,
    userSchema} = require("./Schema");

const ExpressError = require("./utils/ExpressError");

const isLoggedIn = (req,res,next) => { 
    if(!req.isAuthenticated()) {
        throw new ExpressError(401 , "UnAuthorized")
    } 
    next()
}

const checkApprovedUser = (req,res,next) => { 
    if(req.user.status !== "approved"){
        req.logout( (err) => { 
            if (err) return next(err) 
        }) 
        throw new ExpressError(403 ,"Request Doesn't Approved Yet!")
    }
    next();
}

const isManager = (req,res,next) => {
    if(req.user.role !== "admin" && req.user.role !== "manager" ) {
        throw new ExpressError(401, "UnAuthorized - Access Denied")
    }
    next()
}

const isAdmin = (req,res,next) => { 
    if(req.user.role !== "admin" ) {
        throw new ExpressError(403, "Access Denied")
    }
    next()
}

const isAdminOnly = [
    isLoggedIn,
    checkApprovedUser,
    isAdmin
]

const isManagerOnly = [
    isLoggedIn,
    checkApprovedUser,
    isManager
]

const isApprovedUserOnly = [
    isLoggedIn,
    checkApprovedUser
]

function validate(schema,req) { 
    let {error} = schema.validate(req.body);  
    if(error) {
        throw new ExpressError(422 ,error.message)
    }
}

// validate Company 
const validateCompany = (req,res,next) => {
    validate(companySchema,req);
    next();
}

// Validate Product  
const validateProduct = (req,ress,next) => {
    validate(productSchema,req);
    next()
}


// Validate Entry  
const validateEntry = (req,res,next) => {
    validate(entrySchema,req);
    next()
}

//Validate Worker 
const validateWorker = (req,res,next) => {
    validate(workerSchema,req);
    next();
}

//Validate Worker Entry 
const validateWorkerEntry = (req,res,next) => {
    validate(workerEntrySchema,req);
    next();
}

//validate Assember 
const validateAssembler = (req,res,next) => {
    validate(assemblerSchema,req);
    next();
}

//Validate Component 
const validateComponent = (req,res,next) => {
    validate(componentSchema,req);
    next();
}

//Validate Type 
const validateType = (req,res,next) => {
    validate(typeSchema,req);
    next();
}

//Validate Assembler Entry 
const validateAssemblerEntry = (req,res,next) => {
    validate(assemblerEntrySchema,req);
    next();
}

//Validate User 
const validateUser = (req,res,next) => {
    validate(userSchema,req);
    next();
}

module.exports = {isAdminOnly,isManagerOnly,isApprovedUserOnly ,checkApprovedUser,validateCompany , validateProduct ,
    validateEntry   , validateWorker  , validateWorkerEntry,
    validateAssembler , validateComponent ,validateType,
    validateAssemblerEntry ,validateUser}