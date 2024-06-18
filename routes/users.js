const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");

router.get("/signup", (req,res) => {
    res.render("users/signup.ejs");
});

router.post("/signup", async (req,res) => {
    try{
        let newUser = new User(req.body.user);
        // console.log(newUser);
        let registeredUser = await User.register(newUser, req.body.user.password);
        console.log(registeredUser);
        req.flash("success", "Welcome to Wanderlust");
        res.redirect("/listings");
    }    
    catch(err){
        req.flash("error", "User already Exists!");
        res.redirect("/signup");
    }
});

router.get("/login", (req,res) => {
    res.render("users/login.ejs");
});

router.post("/login", passport.authenticate("local", {failureRedirect:'/login', failureFlash: true}),
 async (req,res) => {
    // console.log("lkasdjfldf");
    req.flash("success", "Welcome to Wanderlust");
    res.redirect("/listings");
});


module.exports = router;