if (process.env.NODE_ENV != "production") {
    require("dotenv" ).config({quiet: true})
} 
const express = require("express");
const app = express();
app.set("trust proxy", 1);
const port = process.env.PORT || 8080;
const path = require("path");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError");
const URL = process.env.URL  
const session = require("express-session");
const {MongoStore ,createWebCryptoAdapter}   = require('connect-mongo');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./model/user"); 
const cors = require("cors");

 
const companyRouter = require("./routes/company");
const productRouter = require("./routes/product");
const companyEntryRouter = require("./routes/companyEntry");

const workerRouter = require("./routes/worker");
const workerEntryRouter = require("./routes/workerEntry");

const assemblerRouter = require("./routes/assembler");
const componentRouter = require("./routes/component");
const typeRouter = require("./routes/type");
const assemblerEntryRouter = require("./routes/assemblerEntry");

const userRouter = require("./routes/user");  
const reportRouter = require("./routes/report");

const dbUrl = process.env.ATLASDB_URL

main(dbUrl).then(() => {
    console.log("connection successful");
}).catch((err) => {
    console.log(`mongoose error : ${err}`);
})

async function main(url) {
    await mongoose.connect(url);  
}

const store =  MongoStore.create({
    mongoUrl: dbUrl,
    cryptoAdapter: createWebCryptoAdapter({
        secret: process.env.SECRET
    }),
    touchAfter: 24 * 3600,
})

store.on("error" , (err) => {
    console.log("ERROR in MONGO SESSION STORE", err)
}) 

const sessionOption = {
    store,
    secret: process.env.SECRET,
    resave:false ,
    saveUninitialized:false ,
    cookie : {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000 ,
        maxAge : 7 * 24 * 60 * 60 * 1000 , 
        httpOnly : true
    } 
} 
  
app.use(express.static(path.join(__dirname, "frontend"))); 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session(sessionOption))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.param("id", (req, res, next, id) => {  
    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return next(new ExpressError(400, "Invalid ID"));
    } 
    next();
})

app.use("/company" , companyRouter);
app.use("/company/:id/product" , productRouter);
app.use("/company-entries" , companyEntryRouter);

app.use("/workers", workerRouter);
app.use("/worker-entries" , workerEntryRouter);

app.use("/assemblers" , assemblerRouter);
app.use("/components" , componentRouter);
app.use("/components/:id/type" , typeRouter);
app.use("/assembler-entries" , assemblerEntryRouter);

app.use("/company-dashboard/auth" , userRouter)
app.use("/reports" , reportRouter)

app.use((req,res,next) => {
    res.status(404).json({success:false, message:"Page Not Found"})
})

app.use((err, req,res,next) => {   
    let {status=500 , message="Something Went Wrong"} = err;
    res.status(status).json({success:false, message })
})

app.listen(port,() => {
    console.log(`listening on port ${port}`);
})

