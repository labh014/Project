const express = require("express");
const router = express.Router();

const wrapASync = require("../utility/wrapSync.js");
const expressError = require("../utility/expressError.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const listing = require("../models/listing.js");
// const passport = require("passport");

// VALIDATE SCHEMA BY JOI
const listingValidate = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error)
        {
            throw new expressError(400, error);
        }
    else next();
}

router.get("/",wrapASync( async (req,res) =>{
    const allListings = await listing.find({});
    res.render("listings/index.ejs",  {allListings});
}));

router.get("/new", (req,res) => {
    console.log(req.user);
    if(!req.isAuthenticated()){
        req.flash("error","You must be logged in!");
        return res.redirect("/login");
    }
    res.render("listings/new.ejs");
});

// show routes
router.get("/:id", wrapASync(async (req,res)=> {
    let {id} = req.params;
    const list = await listing.findById(id).populate("reviews");
    if(!list){
        req.flash("error", "You requested for listing not existed!");
        // console.log("mission successfull");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{list});
}));

router.post("/", listingValidate, wrapASync(async (req,res,next) => {
    // if(!req.body.listing)
    //     {
    //         throw new expressError(400, "Please Enter the valid Data for listings in Wanderlust")
    //     }

    // let result = listingSchema.validate(req.body);        
    // console.log(result);
    // if(result.error)
    //     {
    //         console.log(result.error);
    //         throw new expressError(400, result.error);
            
    //     }
    // else {
    //     next();
    // }
    const newListing = new listing(req.body.listing);
    console.log(newListing);
    await newListing.save();
    req.flash("success","New Listing was successfully created!");
    res.redirect("/listings");
}));
    
// Edit route
router.get("/:id/edit", wrapASync(async (req,res) => {
    let {id} = req.params;
    const list = await listing.findById(id);
    if(!list){
        req.flash("error", "You requested for listing not existed!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{list});
}));

// Update Route
router.put("/:id", listingValidate, wrapASync(async (req,res) => {
    if(!req.body.listing)
        {
            throw new expressError(400, "Please Enter the valid Data for listings in Wanderlust")
        }
    let {id} = req.params;
    const updatedList = await listing.findByIdAndUpdate(id, {...req.body.listing}, {runValidators: true, new: true});
    console.log(updatedList);
    req.flash("success","Listing was successfully updated!");
    res.redirect(`/listings/${id}`);
}));

//Delete Route
router.delete("/:id", wrapASync(async (req,res) => {
    let {id} = req.params;
    const deletedList = await listing.findByIdAndDelete(id);
    console.log(deletedList);
    req.flash("success","Listing was successfully deleted");
    res.redirect("/listings");
}));

module.exports = router;