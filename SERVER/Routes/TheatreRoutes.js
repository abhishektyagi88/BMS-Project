const express = require("express");

const router = express.Router();
const Theatre = require("../Models/TheatreModel");

router.post("/add-theatre", async(req,res) => {
    try{
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.send({
        success : true,
        message : "Theatre Added Successfully"
    })
}catch(err){
    res.status(500).send({
        success : false,
        message : err.message
    })
}
})

router.post("/get-all-theatres-by-owner", async(req,res) => {
    try{
    const theatres = await Theatre.find({owner : req.body.owner})
    res.send({
        success : true,
        message : "Theatres Fetched Successfully",
        data : theatres
    })
    }catch(err){
        res.status(500).send({
            success : false,
            message : err.message
        })
    }
})

router.get("/get-all-theatres", async(_,res) => {
    try{
        const theatres = await Theatre.find().populate("owner");
        res.send({
            success : true,
            message : "Theatres Fetched Successfully",
            data : theatres
        })
    }catch(err){
        res.status(500).send({
            success : false,
            message : err.message
        })
    }
})

router.put("/update-theatre" , async(req,res) => {
    try{
    await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
    res.send({
        success : true,
        message : "Theatre Updated Successfully"
    })
   }catch(err){
    res.status(500).send({
        success : false,
        message : err.message
    })
   }
})

router.delete("/delete-theatre", async(req,res) => {
    try{
    await Theatre.findByIdAndDelete(req.query.theatreId);
    res.send({
        success : true,
        message : "Theatre Deleted Successfully"
    })
    }catch(err){
        res.status(500).send({
            success : false,
            message : err.message
        })
    }
})

module.exports = router;