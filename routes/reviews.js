const express = require("express");
const router = express.Router({mergeParams: true});

const wrapASync = require("../utility/wrapSync.js");
const expressError = require("../utility/expressError.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const listing = require("../models/listing.js");


const reviewValidate = (req,res,next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error)
        {
            throw new expressError(400, error);
        }
    else next();
}

// REVIEWS
router.post("/", reviewValidate, wrapASync(async(req,res) => {
    // let {id} = req.params;
    let list = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    list.reviews.push(newReview);
    await newReview.save();
    await list.save();
    req.flash("success", "New Review was successfully Created!");
    res.redirect(`/listings/${list.id}`)
}) );

// DELETE REVIEWS
router.delete("/:reviewId", wrapASync(async(req,res) => {
    let {id,reviewId} = req.params;
    await listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review was successfully Deleted!");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;

