const express= require("express");
const router =express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const expressError=require("../utils/expressError.js");
const { reviewSchema} =require("../schema.js");

const reviewController =require("../controller/review.js");

const validateReview=(req,res,next)=>{
       let {error} = reviewSchema.validate(req.body);
       if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
       throw new expressError(400,errMsg);
    }else{
        next();
    }
};

//post review route
router.post("/",validateReview,wrapAsync(reviewController.createReview)); 

//delete review  route
router.delete("/:reviewId", 
    wrapAsync(reviewController.deleteReview));

module.exports =router;

