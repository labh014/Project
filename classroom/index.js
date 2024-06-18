const express = require("express");
// const router = express.Router();
const app = express(); 

const users = require("./routers/users.js");
const posts = require("./routers/posts.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
    secret: "shubhlabhshubhlabh",
    resave: false,
    saveUninitialized: true,
}

app.use(cookieParser("mysecretthatidonttellyou"));
app.use(session(
    sessionOptions,
));
app.use(flash());

app.use((req,res,next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.failMsg = req.flash("fail");
    next();
});

app.get("/register", (req,res) =>{
    let {name="unknown"} = req.query;
    req.session.name = name;
    // res.send(name);
    if(name==="unknown") req.flash("fail","User not registered");
    else req.flash("success","User successfully registered");
 
    res.redirect("/hello");
});

app.get("/hello", (req,res) => {
    // console.dir(req.flash("success"));
    // res.send(`Hello ${req.session.name}`);
    res.render("page.ejs",{name: req.session.name})
});

app.get("/sessioncounts", (req,res) => {
    if(req.session.count){
        req.session.count++;
    }
    else {
        req.session.count = 1;
    }
    res.send(`You send this request ${req.session.count} times`);
});

app.get("/testing", (req,res) =>{
    res.send("testing is successfull");
})

app.get("/greet", (req,res) => {
    let {name="Unknown"} = req.cookies;
    res.send(`Hi ${name}`);
});

app.get("/getcookies", (req,res) => {
    // res.cookie("greet", "Ram Ram");
    // res.cookie("MadeIn", "India");
    res.cookie("color", "black", {signed: true});
    res.send("some cookies");
});


app.get("/verify", (req,res) => {
    res.send(req.signedCookies);
})
app.get("/", (req,res) => {
    console.log(req.cookies);
    res.send("Hey i am root path");
});

app.use("/users", users);
app.use("/posts", posts);

app.listen(3000, () => {
    console.log("Server is listening on 3000");
})