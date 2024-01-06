const express = require("express");
const router = express.Router();

const Movie = require("../Models/MovieModel");
// const authmiddleware = require("../middlewares/authmiddleware");

router.post("/add-movie", async(req,res) => {
    try{
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(200).send({
            success : true,
            message : "Movie Added Successfully"
        })
    }catch(err){
        res.status(500).send({
            success : false,
            message : err.message
        })
    }
})

router.get("/get-all-movies",async(_,res) => {
    try{
        const Movies = await Movie.find();
        res.send({
            success : true,
            message : "Movies Fetched Successfully",
            data : Movies
        })
    }catch(err){
        res.status(500).send({
            success : false,
            message : err.message
        })
    }
})

router.delete("/delete-movie", async(req,res) => {
    try{
        await Movie.findByIdAndDelete(req.query.movieId);
        res.send({
            success : true,
            message : "Movie Deleted Successfully"
        })
    }catch(err){
        res.status(500).send({
            success : false,
            message : err.message
        })
    }
})

router.put("/update-movie", async(req,res) => {
    try{
    await Movie.findByIdAndUpdate(req.body.movieId, req.body);
    res.send({
        success : true,
        message : "Movie Updated Successfully"
    })
    }catch(err){
        res.status(500).send({
            success : false,
            message : err.message
        })
    }
})

router.get("/get-movie-by-id/:movieId",async(req,res) => {
    try{
        const movie = await Movie.findById(req.params.movieId);
        if(movie){
            res.status(200).send({
                success : true,
                message : "Movie Fetched Successfully",
                data : movie
            })
        }else{
            res.status(404).send({
                success : false,
                message : "Movie Not Found"
            })
        }
    }catch(err){
        res.status(500).send({
            success : false,
            message : err.message
        })
    }
})


module.exports = router;